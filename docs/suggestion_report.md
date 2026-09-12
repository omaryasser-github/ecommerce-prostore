# 🛠️ Senior Suggestion & Action Plan Report

**Date:** September 12, 2026
**Target:** Prostore E-Commerce Bug Fixes

As requested, here is the detailed, step-by-step suggestion report to fix the bugs and inconsistencies currently plaguing the codebase. Do not start new feature work until these are resolved.

---

## 0. Fix the Broken Build (Highest Priority)

**The Problem:** 
Running `npm run build` currently fails because `user.actions.ts` tries to update `paymentMethod` (singular), but `schema.prisma` expects `paymentMethods` (plural).

**The Fix:**
Rename the fields in `schema.prisma` to be singular so they match standard naming conventions and your codebase.
```prisma
// In schema.prisma, change these:
address       Json?     @db.Json
paymentMethod String?
```
Then run `npx prisma db push`. In `user.actions.ts`, ensure you use `data: { address: addresses }` and `data: { paymentMethod: paymentMethod.type }`.

---

## 1. Fix the Sign-In / Sign-Up Buttons & Redirects

**The Problem:** 
The submit buttons appear "broken" because `redirect()` in Next.js throws internally, and when it's called inside a `try/catch` block, the catch swallows it — preventing the navigation from ever happening. Additionally, the sign-up flow passes the hashed password to `signIn` instead of the plain-text one.

**The Fix:**
1. **Restructure Server Actions to Avoid Catching Redirects (Next.js 16+ Recommended Approach):**
   In Next.js 16+, `isRedirectError` is **not a public API**. The recommended pattern is to restructure your server actions so that `redirect()` and `notFound()` are **never called inside a `try/catch` block**. The workflow is:
   
   - **Wrap only the fallible async calls** (e.g., database queries, validation) in `try/catch`.
   - **Do your validation and return-early logic** between the try blocks.
   - **Call `redirect()` / `notFound()` last**, at the top level of the function — with no `try` above it.
   
   **Remove** the `isRedirectError` import entirely:
   ```typescript
   // ❌ REMOVE this import — it is not a public API in Next.js 16+
   import { isRedirectError } from "next/dist/client/components/redirect-error";
   ```
   
   **Restructure `signInWithCredentials`:** Move the `signIn()` call (which triggers `redirect()`) outside the `try/catch`:
   ```typescript
   export async function signInWithCredentials(prevState: unknown, formData: FormData) {
     // Step 1: Validate inside try/catch
     let user;
     try {
       user = signInFormSchema.parse({
         email: formData.get("email"),
         password: formData.get("password"),
       });
     } catch (error) {
       return { success: false, message: "Invalid email or password" };
     }

     // Step 2: Call signIn (which triggers redirect) OUTSIDE try/catch
     await signIn("credentials", user);
     return { success: true, message: "Signed in successful" };
   }
   ```
   
   **Restructure `signUpUser`** the same way — isolate fallible DB work in `try/catch`, then call `signIn()` outside:
   ```typescript
   export async function signUpUser(prevState: unknown, formData: FormData) {
     // Step 1: Validate and create user inside try/catch
     let user;
     try {
       user = signUpFormSchema.parse({ ... });
       const hashedPassword = hashSync(user.password, 10);
       await prisma.user.create({
         data: { name: user.name, email: user.email, password: hashedPassword },
       });
     } catch (error) {
       return { success: false, message: formatError(error) };
     }

     // Step 2: Sign in (triggers redirect) OUTSIDE try/catch
     // Use the ORIGINAL plain-text password, not the hash!
     await signIn("credentials", { email: user.email, password: user.password });
     return { success: true, message: "Signed up successful" };
   }
   ```

2. **Fix the Password Hashing Bug (included above):**
   As shown in the `signUpUser` restructure above, always pass `user.password` (the original plain-text password) to `signIn`, **not** `hashedPassword`. The credentials provider will hash it internally to compare against the stored hash.

---

## 2. Fix the "Add to Cart" Bug

**The Problem:** 
In `lib/actions/cart.actions.ts`, when a user adds an item that *already exists* in the cart, the code updates the quantity in memory but skips the database save because the `prisma.cart.update()` call is accidentally nested inside the `else` block.

**The Fix:**
Move the `prisma.cart.update` and `revalidatePath` calls *outside* of the `if/else` block so they run regardless of whether it's a new or existing item.
```typescript
if (existItem) {
  if (product.stock < existItem.qty + 1) throw new Error("Not enough stock");
  (cart.items as CartItem[]).find(x => x.productId === item.productId)!.qty = existItem.qty + 1;
} else {
  if (product.stock < 1) throw new Error("Not enough stock");
  cart.items.push(item);
}

// ALWAYS SAVE (Move this outside the else block!)
await prisma.cart.update({
  where: { id: cart.id },
  data: {
    items: cart.items,
    ...clacPrice(cart.items as CartItem[]),
  },
});

revalidatePath(`/product/${product.slug}`);
return { success: true, message: "Cart updated successfully" };
```

---

## 3. Fix Product Image Flipping & Distortion

**The Problem:** 
In `components/shared/product/product-images.tsx`, thumbnail images stretch out of proportion, and clicking them doesn't smoothly update the main image.

**The Fix:**
1. Add `className='object-cover object-center'` to the thumbnail `<Image>` component so it doesn't stretch.
2. Add a `key={images[current]}` to the main `<Image>` component to force React to rerender the image properly when the state changes.
```tsx
// For the main image:
<Image
  key={images[current]} // Add this!
  src={images[current]}
  alt='product image'
  fill
  className='object-cover object-center'
/>

// For the thumbnail images:
<Image 
  src={image} 
  alt='image' 
  width={100} 
  height={100} 
  className='object-cover object-center' // Add this!
/>
```

---

## 4. Harden Authentication Route Protection

**The Problem:** 
Route protection is checking `!auth` improperly.

**The Fix:**
Implement a robust Next.js Middleware (`middleware.ts` in the root) to intercept requests before they hit the page.
```typescript
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/shipping-address') || 
                           req.nextUrl.pathname.startsWith('/payment') || 
                           req.nextUrl.pathname.startsWith('/place-order');

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL('/sign-in', req.nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## 5. Align README with Reality

**The Problem:** 
The README claims checkout is fully functional and uses mismatched dependency versions.

**The Fix:**
1. Update the `README.md` "Current Status" section to accurately state: *"Checkout flow (WIP - currently fixing domain data inconsistencies)."*
2. Correct the Next.js version in `package.json` or the README badge.

---

### Execution Strategy for the Junior

1. **Do not write new UI components today.**
2. Start with **Fix #0** (Fix the build!).
3. Move to **Fix #1** (Auth redirects and password).
4. Implement **Fix #2** (Cart save logic).
5. Implement **Fix #3** (Image styling).
6. Once the foundation is solid, then (and only then) complete the checkout flow.

You've got this! Let me know when you are ready to start implementing these changes.

import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places",
  );

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters ",
  }),
  slug: z.string().min(3, {
    message: "Slug must be at least 3 characters ",
  }),
  category: z.string().min(3, {
    message: "Category must be at least 3 characters ",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters ",
  }),
  brand: z.string().min(3, {
    message: "Brand must be at least 3 characters ",
  }),
  stock: z.number(),
  images: z.array(
    z.string().min(3, {
      message: "Product must be at least one image ",
    }),
  ),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for siging in users ;
export const signInFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const signUpFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters ",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm Password must be at least 6 characters",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


// Cart Schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, {
    message: "Product ID is required",
  }),
  name: z.string().min(1, {
    message: "Product name is required",
  }),
  slug: z.string().min(1, {
    message: "Product slug is required",
  }),
  qty: z.number().int().nonnegative({
    message: "Quantity must be postive number",
  }),
  image: z.string().min(1, {
    message: "Product image is required",
  }),
  price: currency,
});


export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, {
    message: "Session cart ID is required",
  }),
  userId: z.string().optional().nullable(),
})


// Schema for shipping address
export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, {
    message: "Full name must be at least 3 characters ",
  }),
  streetAddress: z.string().min(3, {
    message: "Street address must be at least 3 characters ",
  }),
  city: z.string().min(3, {
    message: "City must be at least 3 characters ",
  }),
  country: z.string().min(3, {
    message: "Country must be at least 3 characters ",
  }),
  postalCode: z.string().min(3, {
    message: "Postal code must be at least 3 characters ",
  }),
  lat: z.number().optional(),
  lng: z.number().optional(),
})

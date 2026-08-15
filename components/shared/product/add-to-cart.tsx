'use client';


import { CartItem, Cart } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, ShoppingCart, Minus, Loader } from "lucide-react";
import { toast } from "sonner";
import { ToastAction } from "@/components/ui/toast";
import { addToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {

       const router = useRouter();
       // const {toast} = useToast();

       const [isPending, startTransition] = useTransition();

       const handleAddToCart = async () => {

              startTransition(async () => {

                     const res = await addToCart(item);

                     if (!res!.success) {
                            toast.error("Item not created", {
                                   description: "Your changes have not been saved.",
                            })
                     }

                     toast.success("Item created", {
                            description: res!.message,
                            action: (
                                   <ToastAction className='bg-primary text-white hover:bg-gray-800' onClick={() => router.push("/cart")}>
                                          Go View Cart
                                   </ToastAction>
                            ),
                     });
              });
       };

       // Handle remove from cart
       const handleRemoveFromCart = async () => {
              startTransition(async () => {
                     const res = await removeItemFromCart(item.productId);

                     if (res.success) {
                            toast.success(res.message);
                     } else {
                            toast.error(res.message);
                     }

                     return;
              });
       };

       // check if the item is already in the cart
       const existItem = cart && cart?.items.find((cartItem) => cartItem.productId === item.productId);

       return existItem ? (
              <div>
                     <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
                            {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <Minus className='w-4 h-4' />}
                     </Button>
                     <span className='px-2'>{existItem.qty}</span>
                     <Button type='button' variant='outline' onClick={handleAddToCart}>
                            {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <Plus className='w-4 h-4' />}
                     </Button>
              </div>
       ) : (
              <Button className='w-full' type='button' onClick={handleAddToCart}>
                     {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <Plus className='w-4 h-4' />}
                     Add To Cart
              </Button>
       );
}

export default AddToCart;
'use client';


import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { ToastAction } from "@/components/ui/toast";
import { addToCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item }: { item: CartItem }) => {

       const router = useRouter();
       // const {toast} = useToast();

       const handleAddToCart = async () => {
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
              })
              return;

       }


       return (
              <Button className="w-full" type='button' onClick={handleAddToCart}>
                     Add to cart
              </Button>
       );
}

export default AddToCart;
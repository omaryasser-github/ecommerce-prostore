import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggel";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";



const Menu = () => {
    return (
        <div className="flex justify-end ">
            <nav className="hidden md:flex w-full max-w-xs gap-2">
                <ModeToggle />
                <Button variant="ghost" render={<Link href="/cart" />} nativeButton={false}>
                    <ShoppingCart />Cart
                </Button>
                <Button render={<Link href="/sign-in" />} nativeButton={false} className="bg-black text-white hover:bg-black/90">
                    <UserIcon /> Sign In
                </Button>
            </nav>

            <nav className=" md:hidden ">
                <Sheet >
                    <SheetTrigger className="align-middle">
                        <EllipsisVertical />
                    </SheetTrigger>

                    <SheetContent className=" flex flex-col items-start p-4">
                        <SheetTitle >Menu</SheetTitle>
                        <ModeToggle />
                        <Button variant="ghost" render={<Link href="/cart" />} nativeButton={false}>
                            <ShoppingCart /> Cart
                        </Button>
                        <Button render={<Link href="/sign-in" />} nativeButton={false} className="bg-black text-white hover:bg-black/90">
                            <UserIcon /> Sign In
                        </Button>
                        <SheetDescription >
                            {/* Menu options for mobile view. */}
                        </SheetDescription>
                    </SheetContent>
                </Sheet>
            </nav>
        </div >
    );
}

export default Menu;
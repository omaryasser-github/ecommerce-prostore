import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggel";
import { EllipsisVertical, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import UserButton from "./user-button";



const Menu = () => {
    return (
        <div className="flex justify-end ">
            <nav className="hidden md:flex w-full max-w-xs gap-2">
                <ModeToggle />
                <Button variant="ghost" render={<Link href="/cart" />} nativeButton={false}>
                    <ShoppingCart />Cart
                </Button>
                <UserButton />
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
                            <Link href="/cart" className="flex items-center gap-2">
                                <ShoppingCart />
                                Cart
                            </Link>
                        </Button>
                        <UserButton />
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
import {ShoppingCart , UserIcon} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';



const Header = () => {
    return (
        <header className="w-full border-b">
            <div className="wrapper flex-between">

                <div className="flex-start">
                <Link href="/" className="flex-start">
                    <Image src="public/vercel.svg" alt={`${APP_NAME} logo`}  width={48} height={48} priority />
                    <span className="hidden lg:block font-bold text-2xl ml-3"> {APP_NAME}</span>
                </Link>
                </div>

                <div className="space-x-2">
                    <Button  variant="ghost">
                        <Link href="/cart">Cart
                        <ShoppingCart className="w-5 h-5" />Cart
                        </Link>
                    </Button>
                    <Button variant="ghost">
                        <Link href="/sign-in">
                            <UserIcon className="w-5 h-5" /> Sign In
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
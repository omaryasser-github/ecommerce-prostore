import Link from "next/link";
import { auth } from "@/auth";
import { signOutUser } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";



const UserButton = async () => {

    const session = await auth();

    if (!session) {
        return (
            <Button
                render={<Link href="/sign-in" />}
                nativeButton={false} className="bg-black text-white hover:bg-black/90">
                <UserIcon />   Sign In
            </Button>
        );
    }

    const firstIntial = session.user?.name?.charAt(0).toUpperCase() ?? '';

    return (
        <>
            <div className="flex gap-2 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex items-center">
                            <Button variant="ghost" className="relative rounded-full w-8 h-8 me-2 flex items-center justify-center  bg-gray-200">
                                {firstIntial}
                            </Button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" >
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <div className="text-sm text-muted-foreground leading-none">
                                    {session.user?.name}
                                </div>
                                <div className="text-sm font-medium leading-none">
                                    {session.user?.email}
                                </div>
                            </div>

                            <span className="font-medium">{session.user?.name}</span>
                        </DropdownMenuLabel>

                        <DropdownMenuItem className="p-0 mb-1">
                            <form
                                action={async () => {
                                    "use server";
                                    await signOutUser();
                                }}
                                className="w-full"
                            >
                                <Button type="submit" variant="ghost" className="w-full py-4 px-2 h-4 justify-start">
                                    Sign Out
                                </Button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}

export default UserButton;
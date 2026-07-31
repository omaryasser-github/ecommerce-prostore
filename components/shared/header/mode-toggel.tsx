
'use client';
import { useSyncExternalStore } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, SunMoon } from "lucide-react";

function useMounted() {
    return useSyncExternalStore(
        () => () => { }, // Empty subscribe function (we don't need to subscribe to anything)
        () => true,     // getSnapshot (returns true on client)
        () => false     // getServerSnapshot (returns false on server)
    );
}

const ModeToggle = () => {
    // const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    const mounted = useMounted();
    if (!mounted) return null;


    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    // if (!mounted) {
    //     return null;
    // }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button variant='ghost' className="focus-visible:ring-0 focus-visible:ring-offset-0">
                    {theme === "system" ? <SunMoon /> : theme === "dark" ? <MoonIcon /> : <SunIcon />}
                </Button>
            }>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked={theme === "system"} onCheckedChange={() => setTheme("system")}> System </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={theme === "dark"} onCheckedChange={() => setTheme("dark")}> Dark </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={theme === "light"} onCheckedChange={() => setTheme("light")}> Light </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ModeToggle;
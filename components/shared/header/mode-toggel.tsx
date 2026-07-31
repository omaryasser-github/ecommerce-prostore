 
'use client';
import { useState, useEffect, useSyncExternalStore } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
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
            <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuGroup>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Button variant="ghost" onClick={() => setTheme("light")}>Light</Button>
                <Button variant="ghost" onClick={() => setTheme("dark")}>Dark</Button>
                <Button variant="ghost" onClick={() => setTheme("system")}>System</Button>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ModeToggle;
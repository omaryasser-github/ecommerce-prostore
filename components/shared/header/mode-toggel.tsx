'use client';
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, SunMoon } from "lucide-react";

const ModeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={ 
                <Button variant='ghost' className="focus-visible:ring-0 focus-visible:ring-offset-0">
                    {theme === "system" ? <SunMoon /> : theme === "dark" ? <MoonIcon /> : <SunIcon />}
                </Button>
            }>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Button variant="ghost" onClick={() => setTheme("light")}>Light</Button>
                <Button variant="ghost" onClick={() => setTheme("dark")}>Dark</Button>
                <Button variant="ghost" onClick={() => setTheme("system")}>System</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ModeToggle;
"use client";

import { useTheme } from "next-themes";
import { handleLogout } from "@/services";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut, Moon, Sun } from "lucide-react";

// --------------------- NAVIGATION BAR -----------------------------------------

export default function Navigation() {
    return (
        <nav className="h-14 px-3 sm:px-4 md:px-6 lg:px-10 flex justify-between items-center bg-background border-b border-muted">
            <h1 className="text-3xl text-secondary-foreground font-extrabold uppercase">
                Libsys
            </h1>

            <div className="flex items-center gap-3 text-secondary-foreground">
                <ModeToggle />
                <Button variant="default" onClick={() => handleLogout()}>
                    Log out <LogOut className="pl-2 text-[0.5rem]" />
                </Button>
            </div>
        </nav>
    );
}

// --------------------- THEME SWITCHING BUTTON ---------------------------------

function ModeToggle() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

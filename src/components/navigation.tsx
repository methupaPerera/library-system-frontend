"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { handleLogout } from "@/services";
import { getAccessTokenCookie } from "@/lib/utils";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UpdatePasswordForm } from "./forms";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { LogIn, LogOut, Moon, Sun } from "lucide-react";
import { FaAngleDown } from "react-icons/fa6";

// --------------------- NAVIGATION BAR -----------------------------------------

export default function Navigation() {
    const [isLogggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const tokenCookie = getAccessTokenCookie();

        if (tokenCookie) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    return (
        <nav className="w-full h-14 px-3 sm:px-4 md:px-6 lg:px-10 flex justify-between items-center bg-background border-b border-muted fixed">
            <h1 className="text-3xl text-secondary-foreground font-extrabold uppercase">
                Libsys
            </h1>

            <div className="flex items-center gap-3 text-secondary-foreground">
                <ModeToggle />
                {isLogggedIn ? (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex items-center gap-1"
                            >
                                Profile
                                <FaAngleDown />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="mr-3 sm:mr-4 md:mr-6 lg:mr-10 w-44 flex flex-col items-center gap-2">
                            <UpdatePasswordForm />

                            <Button
                                className="!w-full px-4"
                                variant="secondary"
                                size="sm"
                                onClick={() => handleLogout()}
                            >
                                Log out{" "}
                                <LogOut className="pl-2 text-[0.5rem]" />
                            </Button>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <Button variant="default">
                        <Link href="/login" className="flex items-center">
                            Log in <LogIn className="pl-2 text-[0.5rem]" />
                        </Link>
                    </Button>
                )}
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

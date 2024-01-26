"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { handleLogout } from "@/services";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";

import { LogIn, LogOut, Moon, Sun } from "lucide-react";
import { FaAngleDown } from "react-icons/fa6";

// --------------------- NAVIGATION BAR -----------------------------------------

export default function Navigation() {
    const [isLogggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const cookies = document.cookie
            .split(";")
            .find((cookie) => cookie.startsWith("access_token"));

        if (cookies) {
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
                            <ChangePasswordForm />

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

// --------------------- CHANGE PASSWORD FORM -----------------------------------

function ChangePasswordForm() {
    const { register, handleSubmit } = useForm();

    async function handlePassword(formData: any) {
        const tId = toast.loading("Please wait...");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " +
                    document.cookie
                        .split(";")
                        .find((cookie) => cookie.startsWith("access_token"))
                        ?.split("=")[1],
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        toast.dismiss(tId);

        if (data.status === "success") {
            toast(data.message + ". Please log in again.");
            document.cookie =
                "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            toast(data.message);
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="!w-full px-4" size="sm" variant="outline">
                    Update Password
                </Button>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Update Your Password.</SheetTitle>
                </SheetHeader>

                <form
                    method="POST"
                    onSubmit={handleSubmit((data) => handlePassword(data))}
                    className="mt-8 flex flex-col gap-4"
                >
                    <Input
                        type="text"
                        placeholder="Old Password"
                        required
                        {...register("old_password", { required: true })}
                    />
                    <Input
                        type="text"
                        placeholder="New Password"
                        required
                        {...register("new_password", { required: true })}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </SheetContent>
        </Sheet>
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

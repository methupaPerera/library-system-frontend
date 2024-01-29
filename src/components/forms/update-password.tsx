"use client";

// Importing types.
import { UpdatePasswordInputs } from "@/typings/auth-types";

// Importing utilities.
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import auth from "@/services/auth";

// Importing components.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function UpdatePasswordForm() {
    const { register, handleSubmit } = useForm<UpdatePasswordInputs>();

    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key !== "Enter") return;

            handleSubmit((data) => auth.submitUpdatePassword(data));
        }

        window.addEventListener("keydown", handleKeyPress);
        return window.removeEventListener("keydown", handleKeyPress);
    });

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
                    onSubmit={handleSubmit((data) => {
                        auth.submitUpdatePassword(data);
                    })}
                    className="mt-8 flex flex-col gap-3"
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

                    <Button type="submit" className="mt-6">
                        Submit
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}

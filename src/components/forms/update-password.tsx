"use client";

// Importing types.
import { PasswordFormInputs } from "@/typings/auth-types";

// Importing utilities.
import { useForm } from "react-hook-form";

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
import { toast } from "sonner";

export default function UpdatePasswordForm() {
    const { register, handleSubmit, reset } = useForm<PasswordFormInputs>();

    // Action for the enter key press.
    async function action(data: PasswordFormInputs) {
        const id = toast.loading("Please wait...");

        const res = await fetch("api/password", {
            method: "PATCH",
            body: JSON.stringify(data),
        });

        if (res.status === 401) {
            const res = await fetch("api/token", { method: "POST" });

            if (res.status !== 200) {
                location.reload();
            } else {
                action(data);
            }

            return;
        }
        
        toast.dismiss(id);
        const { message } = await res.json();
        toast(message);
        reset();

        if (res.status === 200) {
            location.reload();
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
                    onSubmit={handleSubmit((data) => action(data))}
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

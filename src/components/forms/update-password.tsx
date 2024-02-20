"use client";

// Importing types.
import type { PasswordFormInputs } from "@/typings/auth-types";

// Importing utilities.
import { useForm } from "react-hook-form";
import { UseFetch } from "@/hooks";
import { toast } from "sonner";

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
    const { register, handleSubmit, reset } = useForm<PasswordFormInputs>();

    // Action for the data submission.
    async function action(data: PasswordFormInputs) {
        const { message, status } = await UseFetch(
            "/api/password",
            "PATCH",
            data
        );

        if (status === 200) {
            toast.success(message);
            location.reload();
        } else {
            toast.error(message);
            reset();
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

"use client";

// Importing types.
import type {
    CheckoutFormInputs,
    CheckoutFormProps,
} from "@/typings/checkout-types";

// Importing utilities.
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useFetch } from "@/hooks";

// Importing components.
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "../ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

export default function CheckoutForm({
    isFormOpen,
    setFormOpen,
}: CheckoutFormProps) {
    const { register, handleSubmit, reset } = useForm<CheckoutFormInputs>();

    // Action for the data submission.
    async function action(data: CheckoutFormInputs) {
        const { message, status } = await useFetch(
            "/api/checkout",
            "POST",
            data
        );

        if (status === 200) {
            toast.success(message);
            reset();
        } else {
            toast.error(message);
        }
    }

    return (
        <Sheet open={isFormOpen} onOpenChange={(open) => setFormOpen(open)}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Checkout Books.</SheetTitle>
                </SheetHeader>

                <form
                    onSubmit={handleSubmit((data) => action(data))}
                    className="mt-8 flex flex-col gap-3"
                >
                    <Input
                        type="text"
                        placeholder="Member ID"
                        required
                        {...register("member_id", { required: true })}
                    />

                    <Input
                        type="text"
                        placeholder="Book ID"
                        required
                        {...register("book_id", { required: true })}
                    />

                    <Button
                        type="submit"
                        className={`mt-6 ${buttonVariants()}`}
                    >
                        Submit
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}

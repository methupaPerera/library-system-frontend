"use client";

// Importing types.
import type {
    CheckoutFormInputs,
    CheckoutFormProps,
} from "@/typings/checkout-types";

// Importing utilities.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Importing components.
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "../ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function CheckoutForm({
    isFormOpen,
    setFormOpen,
}: CheckoutFormProps) {
    const { register, handleSubmit, reset } = useForm<CheckoutFormInputs>();

    // Action for the data submission.
    async function action(data: CheckoutFormInputs) {
        const id = toast.loading("Please wait...");

        const res = await fetch("/api/checkout", {
            method: "POST",
            body: JSON.stringify({ ...data }),
        });

        if (res.status === 401) {
            const res = await fetch("/api/token", { method: "POST" });

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

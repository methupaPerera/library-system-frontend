"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { FaPlus } from "react-icons/fa6";
import { Input } from "../ui/input";

export default function CreateMemberForm() {
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key !== "Enter") return;

            handleSubmit((data) => console.log(data));
        }

        window.addEventListener("keydown", handleKeyPress);
        return window.removeEventListener("keydown", handleKeyPress);
    });

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="sm"
                    className="flex gap-1.5 fixed bottom-6 right-6"
                >
                    Add member <FaPlus />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add New Member.</SheetTitle>
                </SheetHeader>

                <form
                    method="POST"
                    // onSubmit={handleSubmit((data) => submitUpdatePassword(data))}
                    className="mt-8 flex flex-col gap-3"
                >
                    <Input
                        type="text"
                        placeholder="Full Name"
                        required
                        {...register("full_name", { required: true })}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        required
                        {...register("email", { required: true })}
                    />

                    <Button type="submit" className="mt-4">
                        Submit
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}

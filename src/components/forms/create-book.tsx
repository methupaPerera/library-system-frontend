"use client";

// Importing types.
import type {
    CreateBookInputs,
    Genres,
} from "@/typings/admin-types";

// Importing utilities.
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import admin from "@/services/admin";

// Importing components.
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "../ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Importing icons.
import { FaPlus } from "react-icons/fa6";
import { toast } from "sonner";

export default function CreateBookForm() {
    const [genre, setGenre] = useState<null | Genres>(null);

    const { register, handleSubmit } = useForm<CreateBookInputs>();

    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key !== "Enter") return;

            if (!genre) {
                toast("Please select a genre.");
                return;
            }

            handleSubmit((data: CreateBookInputs) =>
                admin.submitCreateBook({ ...data, genre })
            );
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
                    Add book <FaPlus />
                </Button>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add New Book.</SheetTitle>
                </SheetHeader>

                <form
                    method="POST"
                    onSubmit={handleSubmit((data: CreateBookInputs) => {
                        if (!genre) {
                            toast("Please select a genre.");
                            return;
                        }

                        admin.submitCreateBook({ ...data, genre });
                    })}
                    className="mt-8 flex flex-col gap-3"
                >
                    <Input
                        type="text"
                        placeholder="Title"
                        required
                        {...register("title", { required: true })}
                    />

                    <Input
                        type="text"
                        placeholder="Author"
                        required
                        {...register("author", { required: true })}
                    />
                    <div className="flex items-center gap-3">
                        <Input
                            type="text"
                            placeholder="ISBN"
                            required
                            {...register("isbn", { required: true })}
                        />
                        <Input
                            type="text"
                            placeholder="Stock count"
                            required
                            {...register("stock", {
                                required: true,
                            })}
                        />
                    </div>

                    <Select onValueChange={(value: Genres) => setGenre(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Genre" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="science-fiction">
                                    Sci-Fi
                                </SelectItem>
                                <SelectItem value="novel">Novel</SelectItem>
                                <SelectItem value="mystery">Mystery</SelectItem>
                                <SelectItem value="action">Action</SelectItem>
                                <SelectItem value="adventure">
                                    Adventure
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Button
                        type="submit"
                        className={buttonVariants() + " mt-6"}
                    >
                        Submit
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}

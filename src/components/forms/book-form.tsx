"use client";

// Importing types.
import type {
    BookFormInputs,
    BookFormProps,
    Genres,
} from "@/typings/book-types";

// Importing utilities.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { genres } from "@/data";

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

export default function BookForm({ isFormOpen, setFormOpen }: BookFormProps) {
    const { register, handleSubmit, reset } = useForm<BookFormInputs>();

    // Container for the genre input.
    const [genre, setGenre] = useState<undefined | Genres>(undefined);

    // Action for the data submission.
    async function action(data: BookFormInputs) {
        if (!genre) {
            // Making sure that the user have selected a genre.
            toast("Please select a genre.");
            return;
        }

        const id = toast.loading("Please wait...");

        const res = await fetch("/api/book", {
            method: "POST",
            body: JSON.stringify({ ...data, genre }),
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
                    <SheetTitle>Add New Book.</SheetTitle>
                </SheetHeader>

                <form
                    method="POST"
                    onSubmit={handleSubmit((data) => action(data))}
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
                    <Input
                        type="text"
                        placeholder="ISBN"
                        required
                        {...register("isbn", { required: true })}
                    />

                    <div className="flex items-center gap-3">
                        <Select
                            value={genre}
                            onValueChange={(value: Genres) => setGenre(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Genre" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    {genres.map((genre) => {
                                        return (
                                            <SelectItem
                                                key={genre}
                                                value={genre}
                                            >
                                                {genre}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Input
                            type="text"
                            placeholder="Stock Count"
                            required
                            {...register("stock", {
                                required: true,
                            })}
                        />
                    </div>

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

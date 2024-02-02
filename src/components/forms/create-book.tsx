"use client";

// Importing types.
import type { CreateBookInputs, Genres } from "@/typings/admin-types";

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
    const [genre, setGenre] = useState<undefined | Genres>(undefined); // Container for the genre input.

    const genres: Genres[] = [
        "Sci-fi",
        "Novel",
        "Mystery",
        "Action",
        "Adventure",
    ];

    const { register, handleSubmit, reset } = useForm<CreateBookInputs>();

    // Handles the enter key press.
    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key !== "Enter") return;

            // Making sure that the user have selected a genre.
            if (!genre) {
                toast("Please select a genre.");
                return;
            }

            handleSubmit((data) => admin.submitCreateBook({ ...data, genre }));

            reset();
            setGenre(undefined);
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
                    onSubmit={handleSubmit((data) => {
                        // Making sure that the user have selected a genre.
                        if (!genre) {
                            toast("Please select a genre.");
                            return;
                        }

                        admin.submitCreateBook({ ...data, genre });

                        reset();
                        setGenre(undefined);
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

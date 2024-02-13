"use client";

// Importing types.
import type {
    EditBookFormProps,
    UpdateBookFormInputs,
} from "@/typings/book-types";
import type { Genres } from "@/typings/book-types";

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

export default function BookEditForm({
    bookData,
    isFormOpen,
    setFormOpen,
    refresh,
}: EditBookFormProps) {
    const { register, handleSubmit, reset } = useForm<UpdateBookFormInputs>();

    // Container for the genre input.
    const [genre, setGenre] = useState<undefined | Genres>(bookData.genre);

    // Action for the data submission.
    async function action(data: UpdateBookFormInputs) {
        const id = toast.loading("Please wait...");

        const res = await fetch("/api/book", {
            method: "PUT",
            body: JSON.stringify({ ...data, book_id: bookData.book_id, genre }),
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

        const { message } = await res.json();

        toast.dismiss(id);

        if (res.status === 200) {
            toast.success(message);
            reset();
            setFormOpen(false);

            setTimeout(() => {
                refresh();
            }, 500);
        } else {
            toast.error(message);
        }
    }

    return (
        <Sheet open={isFormOpen} onOpenChange={() => setFormOpen(false)}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Update Book.</SheetTitle>
                </SheetHeader>

                <form
                    method="POST"
                    onSubmit={handleSubmit((data) => action(data))}
                    className="mt-8 flex flex-col gap-3"
                >
                    <Input
                        type="text"
                        defaultValue={bookData?.title}
                        placeholder="Title"
                        required
                        {...register("title", { required: true })}
                    />

                    <Input
                        type="text"
                        defaultValue={bookData?.author}
                        placeholder="Author"
                        required
                        {...register("author", { required: true })}
                    />
                    <Input
                        type="text"
                        defaultValue={bookData?.isbn}
                        placeholder="ISBN"
                        required
                        {...register("isbn", { required: true })}
                    />

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
                                        <SelectItem key={genre} value={genre}>
                                            {genre}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <div className="flex items-center gap-3">
                        <Input
                            type="text"
                            placeholder="Add to Stock"
                            required
                            {...register("to_add_stock", { required: true })}
                        />
                        <Input
                            type="text"
                            placeholder="Remove from Stock"
                            required
                            {...register("to_remove_stock", { required: true })}
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

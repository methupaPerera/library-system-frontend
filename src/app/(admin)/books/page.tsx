"use client";

import { CreateBookForm } from "@/components/forms";
import { BooksTable } from "@/components/tables";
import { Genres } from "@/typings/admin-types";
import { useEffect, useState } from "react";
import utils from "@/services/utils";

export type BookTableTypes = {
    book_id: string;
    title: string;
    author: string;
    genre: Genres;
    remaining: string;
};

export default function Books() {
    const [isFormOpen, setFormOpen] = useState<boolean>(false);

    const [data, setData] = useState<BookTableTypes[]>([]);

    useEffect(() => {
        async function fetchBooks() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + utils.getAccessTokenCookie(),
                },
            });

            const {
                data: { books },
            } = await res.json();
            console.log(books);
            setData(books);
        }

        fetchBooks();
    }, []);

    return (
        <div className="px-4 pt-3">
            <h3 className="text-2xl font-semibold text-muted-foreground">
                Books
            </h3>

            <CreateBookForm isFormOpen={isFormOpen} setFormOpen={setFormOpen} />

            <div className="mt-1">
                <BooksTable setFormOpen={setFormOpen} data={data} />
            </div>
        </div>
    );
}

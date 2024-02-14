"use client";

// Importing types.
import type { Book } from "@/typings/book-types";
import type { Pagination } from "@/typings/table-props";

// Importing utilities.
import { useEffect, useState } from "react";
import { bookHeadingData } from "@/data";
import { toast } from "sonner";

// Importing components.
import { BookForm } from "@/components/forms";
import { BookTable } from "@/components/tables";

export default function Books() {
    // Manages the book creation form state.
    const [isFormOpen, setFormOpen] = useState<boolean>(false);

    // Manages the books table's data, loading and pagination states.
    const [data, setData] = useState<Book[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        allPages: 1,
    });

    // Function to fetch data for the current page.
    async function fetchItems(page: number, query: string = " ") {
        setLoading(true);

        const res = await fetch(`/api/book?page=${page}&title=${query}`);

        if (res.status === 401) {
            const res = await fetch("/api/token", { method: "POST" });

            if (res.status !== 200) {
                location.reload();
            } else {
                fetchItems(page, query);
            }

            return;
        }

        const { message, data } = await res.json();

        if (res.status === 500) {
            toast.error(message);
            setLoading(false);
            return;
        }

        setData(data.books);
        setPagination({
            ...pagination,
            currentPage: data.books_count ? page : 1,
            allPages: data.books_count ? Math.ceil(data.books_count / 10) : 1,
        });

        setLoading(false);
    }

    // Fetches the intial data.
    useEffect(() => {
        fetchItems(1, "");
    }, []);

    return (
        <div className="px-4 pt-3">
            <h3 className="text-2xl font-semibold text-muted-foreground">
                Books
            </h3>

            <BookForm isFormOpen={isFormOpen} setFormOpen={setFormOpen} />

            <BookTable
                data={data}
                headingData={bookHeadingData}
                isLoading={isLoading}
                pagination={pagination}
                setPagination={setPagination}
                setFormOpen={setFormOpen}
                fetchItems={fetchItems}
            />
        </div>
    );
}

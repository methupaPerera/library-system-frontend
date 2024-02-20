"use client";

// Importing types.
import type { Book } from "@/typings/book-types";
import type { Pagination } from "@/typings/table-props";

// Importing utilities.
import { useEffect, useState } from "react";
import { bookHeadingData } from "@/data";
import { toast } from "sonner";
import { UseFetch } from "@/hooks";

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
    async function fetchItems(page: number, query: string) {
        setLoading(true);

        const { message, data, status } = await UseFetch(
            `/api/book?page=${page}&title=${query}`,
            "GET",
            undefined,
            false
        );

        if (status === 200) {
            setData(data.books);
            setPagination({
                ...pagination,
                currentPage: data.books_count ? page : 1,
                allPages: data.books_count
                    ? Math.ceil(data.books_count / 10)
                    : 1,
            });
        } else {
            toast.error(message);
        }

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

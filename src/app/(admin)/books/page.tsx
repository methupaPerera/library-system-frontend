"use client";

// Importing types.
import type { Book, Pagination } from "@/typings/prop-types";

// Importing utilities.
import { useEffect, useState } from "react";
import admin from "@/services/admin";
import { headingData } from "@/data";

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
        currentPage: 0,
        allPages: 0,
    });

    // Function to fetch data for the current page.
    async function fetchItems(page: number, query: string) {
        setLoading(true);

        const bookData = await admin.getData<Book>("book", query, page);

        if (bookData) {
            setData(bookData[0]);
            setPagination({
                ...pagination,
                currentPage: page,
                allPages: bookData[1],
            });
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
                headingData={headingData}
                isLoading={isLoading}
                pagination={pagination}
                setPagination={setPagination}
                setFormOpen={setFormOpen}
                fetchItems={fetchItems}
            />
        </div>
    );
}

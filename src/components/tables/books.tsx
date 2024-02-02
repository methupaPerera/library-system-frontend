"use client";

// Importing types.
import type { Book } from "@/typings/prop-types";

// Importing utilities.
import { useEffect, useState } from "react";
import admin from "@/services/admin";
import { cn } from "@/lib/utils";

// Importing components.
import { Skeleton } from "../ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Headings for the book table.
const tableHeadings: { heading: string; width: string }[] = [
    { heading: "Book ID", width: "w-[10%]" },
    { heading: "Title", width: "w-[30%]" },
    { heading: "Author", width: "w-[22%]" },
    { heading: "Genre", width: "w-[20%]" },
    { heading: "Remaining", width: "w-[10%]" },
    { heading: "", width: "w-[8%]" },
];

export default function BooksTable() {
    const [tableData, setTableData] = useState<Book[] | null>(null);
    const [isTableLoading, setTableLoading] = useState<boolean>(true);

    const [pagination, setPagination] = useState<{
        currentPage: number;
        allPages: number;
    }>({
        currentPage: 1,
        allPages: 1,
    });

    async function fetchBooks(page: number) {
        setTableLoading(true);

        const bookData = await admin.getBooks(page);

        if (bookData && !tableData) {
            setTableData(bookData[0]);
            setPagination({ ...pagination, allPages: bookData[1] });
        }

        if (bookData) {
            setTableData(bookData[0]);
        }

        setTableLoading(false);
    }

    useEffect(() => {
        fetchBooks(0);
    }, []);

    return (
        <div className="my-4">
            <h1>
                {pagination.currentPage} of {pagination.allPages}
            </h1>
            <button
                onClick={() => {
                    setPagination((prev) => {
                        const newPagination = {
                            ...prev,
                            currentPage: prev.currentPage + 1,
                        };
                        fetchBooks(newPagination.currentPage - 1);

                        return newPagination;
                    });
                }}
            >
                Inc
            </button>
            <Table className="bg-background rounded-lg">
                <TableHeader>
                    <TableRow>
                        {tableHeadings.map(({ heading, width }) => (
                            <TableHead className={cn(width)} key={heading}>
                                {heading}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {!isTableLoading ? (
                        tableData ? (
                            tableData.map((data) => {
                                return (
                                    <TableRow key={data.book_id}>
                                        <TableCell>{data.book_id}</TableCell>
                                        <TableCell>{data.title}</TableCell>
                                        <TableCell>{data.author}</TableCell>
                                        <TableCell>{data.genre}</TableCell>
                                        <TableCell>{`${
                                            data.stock - data.borrowed_count
                                        } of ${data.stock}`}</TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow className="h-24 text-center">
                                <TableCell colSpan={6}>No Data</TableCell>
                            </TableRow>
                        )
                    ) : (
                        Array.from({ length: 5 }).map((row, index) => {
                            return (
                                <TableRow key={index}>
                                    {Array.from({ length: 5 }).map(
                                        (cell, index) => {
                                            return (
                                                <TableCell key={index + 1}>
                                                    <Skeleton className="h-3 w-full" />
                                                </TableCell>
                                            );
                                        }
                                    )}
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

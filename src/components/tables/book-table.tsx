"use client";

// Importing types.
import type { Book, BookTableProps } from "@/typings/prop-types";

// Importing utilities.
import { useEffect, useState } from "react";

// Importing components.
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

// Importing icons.
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import admin from "@/services/admin";
import { toast } from "sonner";

export default function DataTable<T>({
    data,
    headingData,
    isLoading,
    pagination,
    setPagination,
    fetchItems,
    setFormOpen,
}: BookTableProps) {
    const [searchValue, setSearchValue] = useState<string>("");

    const { currentPage, allPages } = pagination;

    // Handles the enter key press.
    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key !== "Enter") return;

            fetchItems(1, searchValue);
        }

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [searchValue]);

    return (
        <div className="my-4">
            <div className="pb-2 flex flex-col sm:flex-row justify-between items-center gap-2">
                {/* Search and Form open area. */}
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="!h-10 w-full sm:w-[18rem]"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button
                        size="sm"
                        className="!px-6 !h-10 sm:w-32 font-semibold"
                        onClick={() => fetchItems(1, searchValue)}
                    >
                        Search
                    </Button>
                </div>

                <Button
                    size="sm"
                    className="!h-10 w-full sm:w-32"
                    onClick={() => setFormOpen(true)}
                >
                    New Book
                    <FaPlus />
                </Button>
            </div>

            {/* Table area. */}
            <div className="py-3 px-4 bg-background rounded-lg shadow-lg shadow-gray-300 dark:shadow-none dark:border dark:border-muted">
                <ScrollArea type="always" className="h-[20rem] rounded-lg">
                    <ScrollBar orientation="horizontal" />

                    <Table>
                        <TableHeader>
                            <TableRow>
                                {headingData.map(({ heading, width }) => (
                                    <TableHead key={heading} className={width}>
                                        {heading}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {!isLoading ? (
                                data ? (
                                    data.map((rowData, index) => {
                                        const {
                                            book_id,
                                            title,
                                            author,
                                            genre,
                                            stock,
                                            borrowed_count,
                                        } = rowData;

                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{book_id}</TableCell>
                                                <TableCell>{title}</TableCell>
                                                <TableCell>{author}</TableCell>
                                                <TableCell>{genre}</TableCell>
                                                <TableCell>
                                                    {stock - borrowed_count}
                                                </TableCell>
                                                <TableCell>
                                                    <TableAction
                                                        rowData={rowData}
                                                        fetchItems={fetchItems}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow className="h-[20rem] text-center">
                                        <TableCell colSpan={6}>
                                            No Data
                                        </TableCell>
                                    </TableRow>
                                )
                            ) : (
                                Array.from({ length: 10 }).map((_, index) => {
                                    return (
                                        <TableRow key={index}>
                                            {Array.from({
                                                length: headingData.length,
                                            }).map((_, index) => {
                                                return (
                                                    <TableCell key={index + 1}>
                                                        <Skeleton className="h-3 w-full" />
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </ScrollArea>

                {/* Pagination area. */}
                <div className="pt-3 px-4 flex flex-col md:flex-row justify-between items-center gap-2">
                    <div className="text-gray-400 text-[15px] font-semibold">
                        Page {currentPage} of {allPages}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="default"
                            className="!px-8 font-semibold"
                            onClick={() => {
                                setPagination((prevState) => {
                                    const newState = {
                                        ...prevState,
                                        currentPage:
                                            currentPage === 1
                                                ? allPages
                                                : currentPage - 1,
                                        allPages: allPages,
                                    };

                                    fetchItems(
                                        newState.currentPage,
                                        searchValue
                                    );

                                    return newState;
                                });
                            }}
                        >
                            Prev
                        </Button>
                        <Button
                            size="sm"
                            variant="default"
                            className="!px-8 font-semibold"
                            onClick={() => {
                                setPagination((prevState) => {
                                    const newState = {
                                        ...prevState,
                                        currentPage:
                                            currentPage === allPages
                                                ? 1
                                                : currentPage + 1,
                                        allPages: allPages,
                                    };

                                    fetchItems(
                                        newState.currentPage,
                                        searchValue
                                    );

                                    return newState;
                                });
                            }}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TableAction({
    rowData,
    fetchItems,
}: {
    rowData: Book;
    fetchItems: (page: number, query: string) => Promise<void>;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <BsThreeDots />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="mr-6 !p-2 w-36 flex flex-col gap-2">
                <Button
                    size="sm"
                    variant="secondary"
                    className="w-full font-semibold"
                    onClick={() => {
                        navigator.clipboard.writeText(rowData.book_id);
                        toast("Copied.");
                    }}
                >
                    Copy ID
                </Button>

                <DataMonitor bookData={rowData} />

                <Button
                    size="sm"
                    variant="destructive"
                    className="w-full font-semibold"
                    onClick={() => {
                        admin.deleteBook(rowData.book_id);
                        fetchItems(1, "");
                    }}
                >
                    Delete
                </Button>
            </PopoverContent>
        </Popover>
    );
}

function DataMonitor({ bookData }: { bookData: Book }) {
    const {
        book_id,
        title,
        author,
        genre,
        stock,
        borrowed_count,
        isbn,
        total_borrowings,
        stock_history,
    } = bookData;

    const [activeSection, setActiveSection] = useState<number>(0);

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    size="sm"
                    variant="secondary"
                    className="w-full font-semibold"
                >
                    View Book
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <ScrollArea className="h-[100vh]">
                    <div className="mx-auto py-8 w-11/12 sm:w-5/6">
                        <h4 className="text-5xl font-bold">{title}</h4>

                        <div className="pt-4 flex justify-end items-center gap-2">
                            <Button
                                variant="secondary"
                                className="font-semibold"
                                onClick={() => setActiveSection(0)}
                            >
                                Info
                            </Button>
                            <Button
                                variant="secondary"
                                className="font-semibold"
                                onClick={() => setActiveSection(1)}
                            >
                                Edit
                            </Button>
                        </div>

                        <div className="pt-4 font-semibold">
                            {activeSection === 0 && (
                                <Table className="rounded-lg overflow-hidden">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border border-muted text-gray-400">
                                                ID
                                            </TableCell>
                                            <TableCell className="border border-muted">
                                                {book_id}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border border-muted text-gray-400">
                                                ISBN
                                            </TableCell>
                                            <TableCell className="border border-muted">
                                                {isbn}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border border-muted text-gray-400">
                                                Title
                                            </TableCell>
                                            <TableCell className="border border-muted">
                                                {title}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border border-muted text-gray-400">
                                                Author
                                            </TableCell>
                                            <TableCell className="border border-muted">
                                                {author}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border border-muted text-gray-400">
                                                Genre
                                            </TableCell>
                                            <TableCell className="border border-muted">
                                                {genre}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border border-muted text-gray-400">
                                                Stock
                                            </TableCell>
                                            <TableCell className="border border-muted">
                                                {stock}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border border-muted text-gray-400">
                                                Borrowed Count
                                            </TableCell>
                                            <TableCell className="border border-muted">
                                                {borrowed_count}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border border-muted text-gray-400">
                                                Total Borrowings
                                            </TableCell>
                                            <TableCell className="border border-muted">
                                                {total_borrowings}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            )}

                            {activeSection === 1 && "hi"}
                        </div>
                    </div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}

"use client";

// Importing types.
import type { Book, BookTableProps } from "@/typings/book-types";
import type { TableActionProps } from "@/typings/table-props";

// Importing utilities.
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { makeFetch } from "@/functions";

// Importing components.
import Controller from "./controller";
import Pagination from "./pagination";
import { BookEditForm } from "../forms";
import { Skeleton } from "../ui/skeleton";
import { Button, buttonVariants } from "../ui/button";
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
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

// Importing icons.
import { BsThreeDots } from "react-icons/bs";

export default function BookTable({
    data,
    headingData,
    isLoading,
    pagination,
    setPagination,
    setFormOpen,
    fetchItems,
}: BookTableProps) {
    const [searchValue, setSearchValue] = useState<string>("");

    const { currentPage, allPages } = pagination;

    // Function for refreshing the current page.
    function refresh() {
        let page = currentPage;

        if (data && data.length - 1 === 0 && currentPage - 1 !== 0) {
            page = currentPage - 1;
        }

        fetchItems(page, "");
        setSearchValue("");
    }

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
            <Controller
                name="New Book"
                fetchItems={fetchItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setFormOpen={setFormOpen}
                refresh={refresh}
            />

            {/* ------------------ Table area. ------------------ */}

            <div className="py-3 px-4 bg-background rounded-lg shadow-lg shadow-gray-300 dark:shadow-none dark:border dark:border-muted">
                <ScrollArea
                    type="always"
                    className="h-[25rem] sm:h-[20rem] rounded-lg"
                >
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
                                                        refresh={refresh}
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

                <Pagination
                    isLoading={isLoading}
                    searchValue={searchValue}
                    currentPage={currentPage}
                    allPages={allPages}
                    setPagination={setPagination}
                    fetchItems={fetchItems}
                />
            </div>
        </div>
    );
}

function TableAction({ rowData, refresh }: TableActionProps<Book>) {
    const [isFormOpen, setFormOpen] = useState<boolean>(false);

    async function deleteAction() {
        const { message, status } = await makeFetch("/api/book", "DELETE", {
            book_id: rowData.book_id,
        });

        if (status === 200) {
            toast.success(message);
            refresh();
        } else {
            toast.error(message);
        }
    }

    return (
        <>
            <BookEditForm
                bookData={rowData}
                isFormOpen={isFormOpen}
                setFormOpen={setFormOpen}
                refresh={refresh}
            />

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
                        onClick={() => setFormOpen(true)}
                    >
                        Edit
                    </Button>
                    <Details fullData={rowData} />
                    <Button
                        size="sm"
                        variant="destructive"
                        className="w-full font-semibold"
                        onClick={deleteAction}
                    >
                        Delete
                    </Button>
                </PopoverContent>
            </Popover>
        </>
    );
}

function Details({ fullData }: { fullData: Book }) {
    const rows = [];

    for (const key in fullData) {
        rows.push(
            <TableRow key={key}>
                <TableCell className="capitalize !py-2 px-6 text-gray-500 border border-muted">
                    {key.replace("_", " ")}
                </TableCell>
                <TableCell className="!py-2 px-6 border border-muted">
                    {fullData[key]}
                </TableCell>
            </TableRow>
        );
    }

    return (
        <Drawer>
            <DrawerTrigger
                className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
                Details
            </DrawerTrigger>

            <DrawerContent className="m-4 p-4 sm:px-8">
                <p className="mt-2 font-bold text-xl">Details of the book.</p>

                <Table className="mt-2 font-semibold">
                    <TableBody>{rows}</TableBody>
                </Table>
            </DrawerContent>
        </Drawer>
    );
}

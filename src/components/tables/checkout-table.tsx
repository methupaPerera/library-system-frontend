"use client";

// Importing types.
import type { Checkout, CheckoutTableProps } from "@/typings/checkout-types";
import type { TableActionProps } from "@/typings/table-props";

// Importing utilities.
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { makeFetch } from "@/functions";

// Importing components.
import Controller from "./controller";
import Pagination from "./pagination";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
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

// Importing icons.
import { BsThreeDots } from "react-icons/bs";
import { formatDate } from "@/functions";
import { cn } from "@/lib/utils";

export default function CheckoutTable({
    data,
    headingData,
    isLoading,
    pagination,
    setPagination,
    setFormOpen,
    fetchItems,
}: CheckoutTableProps) {
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
                name="Checkout Book"
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
                                            serial,
                                            member_id,
                                            book_id,
                                            borrowed_date,
                                            return_date,
                                            status,
                                        } = rowData;

                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{serial}</TableCell>
                                                <TableCell>
                                                    {member_id}
                                                </TableCell>
                                                <TableCell>{book_id}</TableCell>
                                                <TableCell>
                                                    {formatDate(
                                                        new Date(borrowed_date)
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(
                                                        new Date(return_date)
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={cn(
                                                            "capitalize text-[12px] py-1 px-3 rounded-full text-white",
                                                            {
                                                                "bg-red-400":
                                                                    status ===
                                                                    "borrowed",
                                                                "bg-green-400":
                                                                    status ===
                                                                    "returned",
                                                            }
                                                        )}
                                                    >
                                                        {status}
                                                    </span>
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

function TableAction({ rowData, refresh }: TableActionProps<Checkout>) {
    async function deleteAction() {
        const { message, status } = await makeFetch("/api/checkout", "DELETE", {
            serial: rowData.serial,
        });

        if (status === 200) {
            toast.success(message);
            refresh();
        } else {
            toast.error(message);
        }
    }

    async function returnAction() {
        const { message, status } = await makeFetch("/api/checkout", "PATCH", {
            serial: rowData.serial,
        });

        if (status === 200) {
            toast.success(message);
            refresh();
        } else {
            toast.error(message);
        }
    }

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
                    onClick={returnAction}
                >
                    Return
                </Button>

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
    );
}

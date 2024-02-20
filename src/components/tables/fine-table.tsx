"use client";

// Importing types.
import type { Fine } from "@/typings/fines.types";
import type { FineTableProps } from "@/typings/fines.types";
import type { TableActionProps } from "@/typings/table-props";

// Importing utilities.
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Importing components.
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
import { Input } from "../ui/input";
import { TbRefresh } from "react-icons/tb";
import { useFetch } from "@/hooks";

export default function FineTable({
    data,
    headingData,
    isLoading,
    pagination,
    setPagination,
    fetchItems,
}: FineTableProps) {
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

                <div className="w-full flex justify-end items-center gap-2">
                    <Button
                        size="sm"
                        className="!h-10"
                        onClick={() => refresh()}
                    >
                        <TbRefresh />
                    </Button>
                </div>
            </div>

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
                                        const { member_id, full_name, fines } =
                                            rowData;

                                        return (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {member_id}
                                                </TableCell>
                                                <TableCell>
                                                    {full_name}
                                                </TableCell>
                                                <TableCell>${fines}</TableCell>
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

function TableAction({ rowData, refresh }: TableActionProps<Fine>) {
    async function payAction() {
        const { message, status } = await useFetch("/api/fines", "PATCH", {
            member_id: rowData.member_id,
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
                    onClick={payAction}
                >
                    Pay
                </Button>
            </PopoverContent>
        </Popover>
    );
}

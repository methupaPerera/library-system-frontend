"use client";

// Importing types.
import type { BookTableProps } from "@/typings/prop-types";

// Importing utilities.
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
} from "../ui/table";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key !== "Enter") return;
            
            console.log(searchValue)
            fetchItems(1, searchValue);
        }

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [searchValue]);

    return (
        <div className="my-4">
            <div className="pb-1 flex justify-between items-center">
                <div className="flex items-center gap-1">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="!h-10 w-[18rem]"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button
                        size="sm"
                        className="font-semibold !px-6"
                        onClick={() => fetchItems(1, searchValue)}
                    >
                        Search
                    </Button>
                </div>
                <Button size="sm" onClick={() => setFormOpen(true)}>
                    New Book
                    <FaPlus />
                </Button>
            </div>

            <div className="bg-background p-1 pb-4 px-4 rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {headingData.map(({ heading, width }) => (
                                <TableHead className={cn(width)} key={heading}>
                                    {heading}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                </Table>

                <ScrollArea type="always" className="h-[20rem] rounded-lg">
                    <Table className="bg-background rounded-lg">
                        <TableBody>
                            {!isLoading ? (
                                data ? (
                                    data.map((rowData, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell className="w-[10%]">
                                                    {rowData.book_id}
                                                </TableCell>
                                                <TableCell className="w-[30%]">
                                                    {rowData.title}
                                                </TableCell>
                                                <TableCell className="w-[20%]">
                                                    {rowData.author}
                                                </TableCell>
                                                <TableCell className="w-[20%]">
                                                    {rowData.genre}
                                                </TableCell>
                                                <TableCell className="w-[10%]">
                                                    {rowData.stock -
                                                        rowData.borrowed_count}
                                                </TableCell>
                                                <TableCell className="w-[10%] text-center">
                                                    hi
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
                                Array.from({ length: 10 }).map((row, index) => {
                                    return (
                                        <TableRow key={index}>
                                            {Array.from({
                                                length: headingData.length,
                                            }).map((cell, index) => {
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

                <div className="mt-3 px-4 flex justify-between items-center">
                    <div className="text-gray-400 text-[15px] font-semibold">
                        <span>
                            Page {currentPage} of {allPages}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            className="font-semibold !px-8 !pt-[1px]"
                            variant="default"
                            size="sm"
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
                            className="font-semibold !px-8 !pt-[1px]"
                            variant="default"
                            size="sm"
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

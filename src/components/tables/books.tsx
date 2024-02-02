"use client";

import type { BookTableTypes } from "@/app/(admin)/books/page";

import { useState } from "react";

import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export const columns: ColumnDef<BookTableTypes>[] = [
    {
        accessorKey: "book_id",
        header: "Book ID",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "author",
        header: "Author",
    },
    {
        accessorKey: "genre",
        header: "Genre",
    },

    {
        accessorKey: "remaining",
        header: "Remaining",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const bookData = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <BsThreeDots className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="p-2 flex flex-col justify-center gap-1 cursor-pointer">
                        <DropdownMenuItem
                            className={buttonVariants({ variant: "ghost" })}
                            onClick={() => {
                                navigator.clipboard.writeText(bookData.book_id);
                            }}
                        >
                            Copy Book ID
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className={buttonVariants({ variant: "ghost" })}
                        >
                            View Book
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className={buttonVariants({
                                size: "sm",
                                variant: "destructive",
                            })}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function BooksTable({
    data,
    setFormOpen,
}: {
    data: BookTableTypes[];
    setFormOpen: any;
}) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <div className="w-full">
            <div className="flex justify-between items-center gap-4 py-4">
                <Input
                    className="max-w-sm"
                    placeholder="Search..."
                    onChange={(event) => console.log(event.target.value)}
                />
                <Button
                    className="!mb-[2px] !h-[43px] flex gap-1.5 font-semibold"
                    onClick={() => setFormOpen(true)}
                >
                    Add book <FaPlus />
                </Button>
            </div>

            <div className="rounded-md border">
                <Table className="bg-background rounded-lg">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

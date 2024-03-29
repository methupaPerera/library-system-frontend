"use client";

// Importing types.
import type { Member, MemberTableProps } from "@/typings/member-types";
import type { TableActionProps } from "@/typings/table-props";

// Importing utilities.
import { useEffect, useState } from "react";
import { makeFetch } from "@/functions";
import { toast } from "sonner";

// Importing components.
import Controller from "./controller";
import Pagination from "./pagination";
import { MemberEditForm } from "../forms";
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
import { formatDate } from "@/functions";

export default function MemberTable({
    data,
    headingData,
    isLoading,
    pagination,
    setPagination,
    setFormOpen,
    fetchItems,
}: MemberTableProps) {
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
                name="New Member"
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
                                            member_id,
                                            full_name,
                                            address,
                                            phone_number,
                                        } = rowData;

                                        return (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {member_id}
                                                </TableCell>
                                                <TableCell>
                                                    {full_name}
                                                </TableCell>
                                                <TableCell>{address}</TableCell>
                                                <TableCell>
                                                    {phone_number}
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

function TableAction({ rowData, refresh }: TableActionProps<Member>) {
    const [isFormOpen, setFormOpen] = useState<boolean>(false);

    async function deleteAction() {
        const { message, status } = await makeFetch("/api/member", "DELETE", {
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
        <>
            <MemberEditForm
                memberData={rowData}
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

function Details({ fullData }: { fullData: Member }) {
    const rows = [];

    for (const key in fullData) {
        rows.push(
            <TableRow key={key}>
                <TableCell className="capitalize !py-2 px-6 text-gray-500 border border-muted">
                    {key.replace("_", " ")}
                </TableCell>
                <TableCell className="!py-2 px-6 border border-muted">
                    {key === "registration_date" || key === "expiry_date"
                        ? formatDate(new Date(fullData[key]))
                        : fullData[key]}
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
                <p className="mt-2 font-bold text-xl">Details of the member.</p>

                <Table className="mt-2 font-semibold">
                    <TableBody>{rows}</TableBody>
                </Table>
            </DrawerContent>
        </Drawer>
    );
}

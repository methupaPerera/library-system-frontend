"use client";

// Importing types.
import type { Member } from "@/typings/member-types";
import type { Pagination } from "@/typings/table-props";

// Importing utilities.
import { useEffect, useState } from "react";
import { memberHeadingData } from "@/data";
import { toast } from "sonner";

// Importing components.
import { MemberForm } from "@/components/forms";
import { MemberTable } from "@/components/tables";

export default function Members() {
    // Manages the member creation form state.
    const [isFormOpen, setFormOpen] = useState<boolean>(false);

    // Manages the members table's data, loading and pagination states.
    const [data, setData] = useState<Member[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        allPages: 1,
    });

    // Function to fetch data for the current page.
    async function fetchItems(page: number, query: string = " ") {
        setLoading(true);

        // const res = await fetch(`/api/book?page=${page}&title=${query}`);

        // if (res.status === 401) {
        //     const res = await fetch("/api/token", { method: "POST" });

        //     if (res.status !== 200) {
        //         location.reload();
        //     } else {
        //         fetchItems(page, query);
        //     }

        //     return;
        // }

        // const { message, data } = await res.json();

        // if (res.status === 500) {
        //     toast.error(message);
        //     setLoading(false);
        //     return;
        // }

        // setData(data.books);
        // setPagination({
        //     ...pagination,
        //     currentPage: page,
        //     allPages: Math.ceil(data.books_count / 10),
        // });

        setLoading(false);
    }

    // Fetches the intial data.
    useEffect(() => {
        fetchItems(1, "");
    }, []);

    return (
        <div className="pt-3 px-4">
            <h3 className="font-semibold text-2xl text-muted-foreground">
                Members
            </h3>

            <MemberForm isFormOpen={isFormOpen} setFormOpen={setFormOpen} />

            <MemberTable
                data={data}
                headingData={memberHeadingData}
                isLoading={isLoading}
                pagination={pagination}
                setPagination={setPagination}
                setFormOpen={setFormOpen}
                fetchItems={fetchItems}
            />
        </div>
    );
}

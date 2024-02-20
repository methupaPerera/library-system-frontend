"use client";

// Importing types.
import type { Member } from "@/typings/member-types";
import type { Pagination } from "@/typings/table-props";

// Importing utilities.
import { useEffect, useState } from "react";
import { memberHeadingData } from "@/data";
import { makeFetch } from "@/functions";
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
    async function fetchItems(page: number, query: string) {
        setLoading(true);

        const { message, data, status } = await makeFetch(
            `/api/member?page=${page}&name=${query}`,
            "GET",
            undefined,
            false
        );

        if (status === 200) {
            setData(data.members);
            setPagination({
                ...pagination,
                currentPage: data.members_count ? page : 1,
                allPages: data.members_count
                    ? Math.ceil(data.members_count / 10)
                    : 1,
            });
        } else {
            toast.error(message);
        }

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

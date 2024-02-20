"use client";

// Importing types.
import type { Fine } from "@/typings/fines.types";
import type { Pagination } from "@/typings/table-props";

// Importing utilities.
import { useEffect, useState } from "react";
import { fineHeadingData } from "@/data";
import { useFetch } from "@/hooks";
import { toast } from "sonner";

// Importing components.
import { FineTable } from "@/components/tables";

export default function Fines() {
    // Manages the fines table's data, loading and pagination states.
    const [data, setData] = useState<Fine[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        allPages: 1,
    });

    // Function to fetch data for the current page.
    async function fetchItems(page: number, query: string) {
        setLoading(true);

        const { message, data, status } = await useFetch(
            `/api/fines?page=${page}&member_id=${query}`,
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
        <div className="px-4 pt-3">
            <h3 className="text-2xl font-semibold text-muted-foreground">
                Fines
            </h3>

            <FineTable
                data={data}
                headingData={fineHeadingData}
                isLoading={isLoading}
                pagination={pagination}
                setPagination={setPagination}
                fetchItems={fetchItems}
            />
        </div>
    );
}

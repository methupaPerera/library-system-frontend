"use client";

// Importing types.
import type { Checkout } from "@/typings/checkout-types";
import type { Pagination } from "@/typings/table-props";

// Importing utilities.
import { useEffect, useState } from "react";
import { checkoutHeadingData } from "@/data";
import { makeFetch } from "@/functions";
import { toast } from "sonner";

// Importing components.
import { CheckoutForm } from "@/components/forms";
import { CheckoutTable } from "@/components/tables";

export default function Checkouts() {
    // Manages the checkout creation form state.
    const [isFormOpen, setFormOpen] = useState<boolean>(false);

    // Manages the checkouts table's data, loading and pagination states.
    const [data, setData] = useState<Checkout[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        allPages: 1,
    });

    // Function to fetch data for the current page.
    async function fetchItems(page: number, query: string) {
        setLoading(true);

        const { message, data, status } = await makeFetch(
            `/api/checkout?page=${page}&id=${query}`,
            "GET",
            undefined,
            false
        );

        if (status === 200) {
            setData(data.checkouts);
            setPagination({
                ...pagination,
                currentPage: data.checkouts_count ? page : 1,
                allPages: data.checkouts_count
                    ? Math.ceil(data.checkouts_count / 10)
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
                Checkouts
            </h3>

            <CheckoutForm isFormOpen={isFormOpen} setFormOpen={setFormOpen} />

            <CheckoutTable
                data={data}
                headingData={checkoutHeadingData}
                isLoading={isLoading}
                pagination={pagination}
                setPagination={setPagination}
                setFormOpen={setFormOpen}
                fetchItems={fetchItems}
            />
        </div>
    );
}

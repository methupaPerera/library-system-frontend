"use client";

// Importing types.
import type { PaginationProps } from "@/typings/table-props";

// Importing components.
import { Button } from "../ui/button";

// Importing icons.
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function Pagination({
    searchValue,
    currentPage,
    allPages,
    setPagination,
    fetchItems,
    isLoading,
}: PaginationProps) {
    return (
        <div className="pt-3 px-4 flex justify-between items-center gap-2">
            <div className="text-gray-400 text-[15px] font-semibold select-none">
                Page {currentPage} of {allPages}
            </div>

            <div className="flex items-center gap-2">
                {/* Prev button. */}
                <Button
                    size="sm"
                    variant="default"
                    className="font-semibold"
                    disabled={isLoading}
                    onClick={() => {
                        setPagination((prevState) => {
                            const newState = {
                                ...prevState,
                                currentPage:
                                    currentPage === 1
                                        ? allPages
                                        : currentPage - 1,
                            };

                            fetchItems(newState.currentPage, searchValue);

                            return newState;
                        });
                    }}
                >
                    <FaChevronLeft />
                </Button>

                {/* Next button. */}
                <Button
                    size="sm"
                    variant="default"
                    className="font-semibold"
                    disabled={isLoading}
                    onClick={() => {
                        setPagination((prevState) => {
                            const newState = {
                                ...prevState,
                                currentPage:
                                    currentPage === allPages
                                        ? 1
                                        : currentPage + 1,
                            };

                            fetchItems(newState.currentPage, searchValue);

                            return newState;
                        });
                    }}
                >
                    <FaChevronRight />
                </Button>
            </div>
        </div>
    );
}

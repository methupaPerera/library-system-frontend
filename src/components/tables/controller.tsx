// Importing components.
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// Importing icons.
import { FaPlus } from "react-icons/fa6";
import { TbRefresh } from "react-icons/tb";
import { ControllerProps } from "@/typings/table-props";

export default function Controller({
    searchValue,
    setSearchValue,
    setFormOpen,
    fetchItems,
    refresh
}: ControllerProps) {
    return (
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
                    className="!h-10 w-full sm:w-32"
                    onClick={() => setFormOpen(true)}
                >
                    New Book
                    <FaPlus />
                </Button>
                <Button size="sm" className="!h-10" onClick={() => refresh()}>
                    <TbRefresh />
                </Button>
            </div>
        </div>
    );
}

// Importing types.
import type { BookDataProps, DashboardItems } from "@/typings/prop-types";

// Importing utilities.
import { cookies } from "next/headers";

// Importing components.
import { StaticsCard } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

// Importing icons.
import { FaCoins } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { BsFillPeopleFill } from "react-icons/bs";
import { TbCalendarDue } from "react-icons/tb";
import { InfoIcon } from "lucide-react";

// Dashboard component.
export default async function Dashboard() {
    // Fetching dashboard information from the server.
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard-info`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies().get("access_token")?.value}`,
            },
        }
    );

    const {
        status,
        message,
        data: { members_count, books_count, total_fines, top_books },
    }: DashboardItems = await res.json();

    return (
        <div className="pt-3 px-4">
            <h3 className="font-semibold text-2xl text-muted-foreground">
                Dashboard
            </h3>

            <div className="pt-4 flex flex-col md:flex-row gap-4">
                {/* Statistics cards section. */}
                <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                    <StaticsCard
                        caption="Books"
                        value={books_count}
                        Icon={ImBooks}
                    />
                    <StaticsCard
                        caption="Members"
                        value={members_count}
                        Icon={BsFillPeopleFill}
                    />
                    <StaticsCard
                        caption="Fines"
                        value={`$${total_fines}`}
                        Icon={FaCoins}
                    />
                    <StaticsCard
                        caption="Overdues"
                        value={123}
                        Icon={TbCalendarDue}
                    />
                </div>

                {/* Top Books section. */}
                <div className="bg-background p-4 w-full md:w-1/2 rounded-lg shadow-lg shadow-gray-300 dark:shadow-none dark:border dark:border-muted">
                    <span className="py-1 px-3 font-semibold bg-secondary rounded-full">
                        Top Books
                    </span>

                    {/* Scrollable area for top books. */}
                    <ScrollArea
                        type="always"
                        className="h-[14.5rem] mt-3 px-2 pr-4"
                    >
                        {top_books.map((book: BookDataProps) => {
                            return <BookData key={book.title} {...book} />;
                        })}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}

// Generates the rows of the most-read-books table.
function BookData({ title, author, stock, borrowed_count }: BookDataProps) {
    return (
        <div className="pb-2 mb-2 border-b border-muted">
            <div className="border-r border-muted">
                <h6 className="font-semibold">{title}</h6>

                <p className="text-[14px] text-gray-400 font-semibold">
                    {author}
                </p>

                {/* Displaying book availability status. */}
                {stock > borrowed_count ? (
                    <span className="bg-green-400 text-[12px] mt-0.5 py-0.5 px-2 rounded-full text-white">
                        Available
                    </span>
                ) : (
                    <span className="bg-red-400 text-[12px] py-0.5 px-2 rounded-full text-white">
                        Not available
                    </span>
                )}
            </div>
        </div>
    );
}

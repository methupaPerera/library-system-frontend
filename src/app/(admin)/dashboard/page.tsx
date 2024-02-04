// Importing types.
import type {
    DashboardItems,
    TopBookDataProps,
    RecentCheckoutProps,
} from "@/typings/prop-types";

// Importing utilities.
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import utils from "@/services/utils";

// Importing components.
import { StaticsCard } from "@/components";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Importing icons.
import { ImBooks } from "react-icons/im";
import { BsFillPeopleFill } from "react-icons/bs";
import { TbCalendarDue } from "react-icons/tb";
import { LuCoins } from "react-icons/lu";

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
        data: {
            members_count,
            books_count,
            total_fines,
            top_books,
            recent_checkouts,
        },
    }: DashboardItems = await res.json();

    return (
        <div className="pt-3 px-4">
            <h3 className="font-semibold text-2xl text-muted-foreground">
                Dashboard
            </h3>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
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
                        Icon={LuCoins}
                    />
                    <StaticsCard
                        caption="Overdues"
                        value={123}
                        Icon={TbCalendarDue}
                    />
                </div>

                {/* Top Books section. */}
                <div className="bg-background p-4 w-full md:w-1/2 rounded-lg shadow-lg shadow-gray-300 dark:shadow-none dark:border dark:border-muted">
                    <span className="text-xl text-foreground px-1 font-semibold">
                        Top Books
                    </span>

                    <ScrollArea
                        type="always"
                        className="h-[16rem] mt-3 px-2 pr-4"
                    >
                        {top_books.map((book: TopBookDataProps) => {
                            return <BookData key={book.title} {...book} />;
                        })}
                    </ScrollArea>
                </div>
            </div>

            {/* Recent checkouts section. */}
            <div className="mt-4 flex flex-col md:flex-row gap-4">
                <div className="w-full bg-background p-4 rounded-lg shadow-lg shadow-gray-300 dark:shadow-none dark:border dark:border-muted">
                    <span className="text-xl text-foreground px-1 font-semibold">
                        Recent Checkouts
                    </span>

                    <ScrollArea type="always" className="h-[16rem] pr-4 mt-3">
                        <ScrollBar orientation="horizontal" />
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Serial</TableHead>
                                    <TableHead>Member ID</TableHead>
                                    <TableHead>Book ID</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {recent_checkouts.map(
                                    (checkout: RecentCheckoutProps) => (
                                        <TableRow key={checkout.serial}>
                                            <TableCell className="font-medium">
                                                {checkout.serial}
                                            </TableCell>
                                            <TableCell>
                                                {checkout.member_id}
                                            </TableCell>
                                            <TableCell>
                                                {checkout.book_id}
                                            </TableCell>
                                            <TableCell>
                                                {utils.formatDate(
                                                    checkout.return_date
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={cn(
                                                        "capitalize text-[12px] mt-0.5 py-0.5 px-2 rounded-full text-white bg-green-400",
                                                        {
                                                            "!bg-red-400":
                                                                checkout.status ===
                                                                "borrowed",
                                                        }
                                                    )}
                                                >
                                                    {checkout.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}

// Generates the rows of the most-read-books table.
function BookData({ title, author, stock, borrowed_count }: TopBookDataProps) {
    return (
        <div className="pb-2 mb-2 border-b border-muted">
            <div>
                <h6 className="font-semibold">{title}</h6>

                <p className="text-[14px] text-gray-400 font-semibold">
                    {author}
                </p>
            </div>

            {/* Displaying book availability status. */}
            <div>
                {stock > borrowed_count ? (
                    <span className="bg-green-400 text-[12px] mt-0.5 py-0.5 px-2 rounded-full text-white">
                        Available
                    </span>
                ) : (
                    <span className="bg-red-400 text-[12px] mt-0.5 py-0.5 px-2 rounded-full text-white">
                        Not available
                    </span>
                )}
            </div>
        </div>
    );
}

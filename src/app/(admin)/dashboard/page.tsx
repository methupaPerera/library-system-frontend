// Importing types.
import type { BookDataProps, DashboardItems } from "@/typings/prop-types";

// Importing utilities.
import { cookies } from "next/headers";

// Importing components.
import { StaticsCard } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";

// Importing icons.
import { FaCoins } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { BsFillPeopleFill } from "react-icons/bs";
import { TbCalendarDue } from "react-icons/tb";

// Dashboard. -----------------------------------------------------------------
export default async function Dashboard() {
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
        data: { books_count, members_count, top_books, total_fines },
    }: DashboardItems = await res.json();

    return (
        <div className="pt-3 px-4">
            <h3 className="font-semibold text-2xl text-muted-foreground">
                Dashboard
            </h3>

            <div className="pt-4 flex flex-col md:flex-row gap-4">
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

                <div className="bg-background p-4 w-full md:w-1/2 rounded-lg shadow-lg shadow-gray-300 dark:shadow-none dark:border dark:border-muted">
                    <span className="py-1 px-3 font-semibold bg-secondary rounded-full">
                        Top Books
                    </span>

                    <ScrollArea
                        type="always"
                        className="h-[14.5rem] mt-3 px-2 pr-4"
                    >
                        {top_books.map((book: BookDataProps) => {
                            return <BookData {...book} />;
                        })}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}

// Generates the rows of most-read-books table. -------------------------------
function BookData({
    title,
    author,
    genre,
    total_borrowings,
    stock,
    borrowed_count,
}: BookDataProps) {
    return (
        <div className="pb-2 mb-2 border-b border-muted flex">
            <div className="w-1/2 border-r border-muted">
                <h6 className="font-semibold">{title}</h6>

                <p className="text-[14px] text-gray-400 font-semibold">
                    {author}
                </p>

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

            <div className="w-1/2 p-2 border-r border-muted">
                <p className="text-[12px] font-semibold text-gray-500">
                    Genre - {genre}
                </p>
                <p className="text-[12px] font-semibold text-gray-500">
                    Total Checkouts - {total_borrowings}
                </p>
                <p className="text-[12px] font-semibold text-gray-500">
                    Remaining - {stock - borrowed_count}
                </p>
            </div>
        </div>
    );
}

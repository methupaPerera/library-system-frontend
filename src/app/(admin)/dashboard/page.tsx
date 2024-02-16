"use client";

// Importing types.
import type {
    DashboardData,
    RecentCheckoutProps,
    TopBookDataProps,
} from "@/typings/comp-props";

// Importing utilities.
import { useState, useEffect } from "react";

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
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatDate } from "@/functions";

// Dashboard component.
export default function Dashboard() {
    const [data, setData] = useState<null | DashboardData>(null);

    async function fetchData() {
        const res = await fetch("/api/dashboard", {
            method: "GET",
        });

        if (res.status === 401) {
            const res = await fetch("/api/token", { method: "POST" });

            if (res.status !== 200) {
                location.reload();
            } else {
                fetchData();
            }

            return;
        }

        const { data } = await res.json();

        setData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="pt-3 px-4">
            <h3 className="font-semibold text-2xl text-muted-foreground">
                Dashboard
            </h3>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                {/* Statistics cards section. */}
                <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                    <StaticsCard
                        caption="Members"
                        value={data?.members_count}
                        Icon={BsFillPeopleFill}
                    />
                    <StaticsCard
                        caption="Books"
                        value={data?.books_count}
                        Icon={ImBooks}
                    />
                    <StaticsCard
                        caption="Fines"
                        value={data?.total_fines}
                        Icon={LuCoins}
                    />
                    <StaticsCard
                        caption="Overdues"
                        value={data?.overdues}
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
                        {data
                            ? data.top_books.map((book: TopBookDataProps) => {
                                  return (
                                      <BookData key={book.title} {...book} />
                                  );
                              })
                            : [1, 2, 3, 4, 5].map((item) => (
                                  <div
                                      key={item}
                                      className="flex flex-col pb-2 gap-2 mb-2 border-b border-muted"
                                  >
                                      <div className="flex flex-col gap-2">
                                          <div className="font-semibold">
                                              <Skeleton className="w-3/4 h-4" />
                                          </div>

                                          <div className="text-[14px] text-gray-400 font-semibold">
                                              <Skeleton className="w-1/2 h-4" />
                                          </div>
                                      </div>

                                      <div>
                                          <Skeleton className="w-1/4 h-4" />
                                      </div>
                                  </div>
                              ))}
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
                                {data
                                    ? data.recent_checkouts.map(
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
                                                      {formatDate(
                                                          new Date(
                                                              checkout.return_date
                                                          )
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
                                      )
                                    : [1, 2, 3, 4, 5].map((item) => (
                                          <TableRow key={item}>
                                              <TableCell className="font-medium">
                                                  <Skeleton className="h-3 w-full" />
                                              </TableCell>
                                              <TableCell>
                                                  <Skeleton className="h-3 w-full" />
                                              </TableCell>
                                              <TableCell>
                                                  <Skeleton className="h-3 w-full" />
                                              </TableCell>
                                              <TableCell>
                                                  <Skeleton className="h-3 w-full" />
                                              </TableCell>
                                              <TableCell>
                                                  <Skeleton className="h-3 w-full" />
                                              </TableCell>
                                          </TableRow>
                                      ))}
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

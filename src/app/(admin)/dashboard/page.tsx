import type { BookDataProps } from "@/typings";

import { StaticsCard } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Dashboard() {
    return (
        <div className="pt-3 px-4">
            <h3 className="font-semibold text-2xl text-muted-foreground">
                Dashboard
            </h3>

            <div className="pt-4 flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                    <StaticsCard caption="Books" value={226} />
                    <StaticsCard caption="Members" value={463} />
                    <StaticsCard caption="Fines" value="$165" />
                    <StaticsCard caption="Overdues" value={123} />
                </div>

                <div className="bg-background p-4 w-full md:w-1/2 rounded-lg shadow-lg shadow-gray-300 dark:shadow-none dark:border dark:border-muted">
                    <span className="py-1 px-3 font-semibold bg-secondary rounded-full">
                        Top Books
                    </span>
                    <ScrollArea type="always" className="h-52 mt-3 px-2 pr-4">
                        <BookData
                            {...{
                                name: "Sccoby Doo",
                                author: "J.K. Rowling",
                                availability: true,
                            }}
                        />
                        <BookData
                            {...{
                                name: "Sc Do",
                                author: "J.K. Rowling",
                                availability: false,
                            }}
                        />
                        <BookData
                            {...{
                                name: "Sccoby Doo",
                                author: "J.K. Rowling",
                                availability: true,
                            }}
                        />
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}

function BookData({ name, author, availability }: BookDataProps) {
    return (
        <div className="pb-2 mb-2 border-b border-muted">
            <h6>{name}</h6>
            <p className="text-[14px] text-gray-400 font-semibold">{author}</p>
            {availability ? (
                <span className="bg-green-400 text-[12px] py-0.5 px-2 rounded-full text-white">
                    Available
                </span>
            ) : (
                <span className="bg-red-400 text-[12px] py-0.5 px-2 rounded-full text-white">
                    Not available
                </span>
            )}
        </div>
    );
}

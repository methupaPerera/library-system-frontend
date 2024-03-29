"use client";

// Importing types.
import type { Member } from "@/typings/member-types";
import type { CheckoutHistory } from "@/typings/checkout-types";

// Importing utilities.
import { useEffect, useState } from "react";
import { formatDate, makeFetch } from "@/functions";
import { useAppContext } from "@/contexts/context";
import { cn } from "@/lib/utils";

// Importing components.
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
    const { setLoggedIn } = useAppContext();

    const [userData, setUserData] = useState<
        (Member & { history: CheckoutHistory[] }) | null
    >();
    useEffect(() => {
        async function getUser() {
            const {
                message,
                data: { member_data, history },
                status,
            } = await makeFetch("/api/profile", "GET", null, false);

            setUserData({ ...member_data, history });
        }

        getUser();

        setLoggedIn(true);
    }, []);

    return (
        <div className="m-4">
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-6">
                    <Avatar className="size-24 mx-auto">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-5xl font-bold text-gray-400">
                            {userData?.full_name[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div className="grid grid-cols-2 gap-4">
                        <Info heading="Name" data={userData?.full_name} />
                        <Info heading="Email" data={userData?.email} />
                        <Info heading="Address" data={userData?.address} />
                        <Info heading="Phone" data={userData?.phone_number} />
                        <Info
                            heading="Membership Type"
                            data={userData?.membership_type}
                        />
                        <Info
                            heading="Fines"
                            data={userData?.fines.toString()}
                        />
                        <Info
                            heading="Resgistration Date"
                            data={
                                userData?.registration_date &&
                                formatDate(
                                    new Date(userData?.registration_date)
                                )
                            }
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Borrowing History</CardTitle>
                </CardHeader>

                <CardContent className="px-16">
                    {userData?.history ? (
                        userData.history.length > 0 ? (
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full max-w-sm mx-auto"
                            >
                                <CarouselContent>
                                    {userData.history.map(
                                        ({
                                            serial,
                                            book_title,
                                            borrowed_date,
                                            return_date,
                                            status,
                                        }) => (
                                            <CarouselItem
                                                key={serial}
                                                className=""
                                            >
                                                <Card>
                                                    <CardContent className="aspect-square px-8 py-6">
                                                        <p className="text-right mb-4">
                                                            <span
                                                                className={cn(
                                                                    "py-1 px-3 rounded-full text-white text-sm capitalize",
                                                                    "bg-green-400",
                                                                    {
                                                                        "!bg-red-400":
                                                                            status ===
                                                                            "borrowed",
                                                                    }
                                                                )}
                                                            >
                                                                {status}
                                                            </span>
                                                        </p>

                                                        <p className="font-bold text-2xl mb-6">
                                                            {book_title}
                                                        </p>

                                                        <div className="flex flex-col gap-4">
                                                            <Info
                                                                heading="Serial"
                                                                data={serial}
                                                            />
                                                            <Info
                                                                heading="Borrowed Date"
                                                                data={formatDate(
                                                                    new Date(
                                                                        borrowed_date
                                                                    )
                                                                )}
                                                            />
                                                            <Info
                                                                heading="Return Date"
                                                                data={formatDate(
                                                                    new Date(
                                                                        return_date
                                                                    )
                                                                )}
                                                            />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </CarouselItem>
                                        )
                                    )}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        ) : (
                            <p className="text-center py-12">No Information.</p>
                        )
                    ) : (
                        <p className="text-center py-12">Loading...</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function Info({
    heading,
    data,
}: {
    heading: string;
    data: string | number | undefined;
}) {
    return (
        <div className="flex flex-col space-y-1.5">
            {data ? (
                <>
                    <Label htmlFor="name">{heading}</Label>
                    <Input
                        className="disabled:opacity-80"
                        id="name"
                        value={data}
                        disabled
                    />
                </>
            ) : (
                <>
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-full h-10" />
                </>
            )}
        </div>
    );
}

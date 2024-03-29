"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/contexts/context";
import { makeFetch } from "@/functions";
import { Member } from "@/typings/member-types";
import { useEffect, useState } from "react";

export default function Profile() {
    const { setLoggedIn } = useAppContext();

    const [userData, setUserData] = useState<Member | null>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getUser() {
            setIsLoading(true);

            const {
                message,
                data: { member_data },
                status,
            } = await makeFetch("/api/profile", "GET", null, false);

            setUserData(member_data);

            setIsLoading(false);
        }

        getUser();

        setLoggedIn(true);
    }, []);

    return (
        <div className="mx-auto h-[calc(100vh-3.5rem)] flex flex-col gap-2 items-center justify-center font-bold">
            {isLoading ? <Skeleton className="w-10 h-5" /> : <p>{userData?.full_name}</p>}
        </div>
    );
}

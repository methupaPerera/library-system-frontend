"use client";

import { useAppContext } from "@/contexts/context";
import { makeFetch } from "@/functions";
import { Member } from "@/typings/member-types";
import { useEffect, useState } from "react";

export default function Profile() {
    const { setLoggedIn } = useAppContext();

    const [userData, setUserData] = useState<{} | null>();
    useEffect(() => {
        async function getUser() {
            const res = await makeFetch(
                "/api/profile",
                "GET",
                null,
                false
            );

            const data: Member = res.data;

            console.log(data);
        }

        getUser();

        setLoggedIn(true);
    }, []);

    return (
        <div className="mx-auto h-[calc(100vh-3.5rem)] flex flex-col gap-2 items-center justify-center font-bold">
            <h2 className="text-5xl">Under Development.</h2>
            <p>You can still reset your password.</p>
        </div>
    );
}

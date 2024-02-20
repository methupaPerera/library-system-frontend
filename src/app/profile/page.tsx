"use client";

import { useAppContext } from "@/contexts/context";
import { useEffect } from "react";

export default function Profile() {
    const { setLoggedIn } = useAppContext();

    useEffect(() => {
        setLoggedIn(true);
    }, []);

    return (
        <div className="mx-auto h-[calc(100vh-3.5rem)] flex flex-col gap-2 items-center justify-center font-bold">
            <h2 className="text-5xl">Under Development.</h2>
            <p>You can still reset your password.</p>
        </div>
    );
}

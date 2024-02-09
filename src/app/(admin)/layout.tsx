"use client";

// Importing types.
import type { Children } from "@/typings/prop-types";

// Importing components.
import { Sidebar } from "@/components";
import { useEffect } from "react";
import { useAppContext } from "@/contexts/context";

export default function AdminLayout({ children }: Children) {
    const { setLoggedIn } = useAppContext();

    // Sets the logged state to true because users can access this page only if they were logged in.
    useEffect(() => {
        setLoggedIn(true);
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className="pl-16 min-h-[calc(100vh-3.5rem)] w-full bg-secondary">
                {children}
            </div>
        </div>
    );
}

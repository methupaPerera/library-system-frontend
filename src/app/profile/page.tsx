"use client";

import { useAppContext } from "@/contexts/context";
import { useEffect } from "react";

export default function Profile() {
    const { setLoggedIn } = useAppContext();

    useEffect(() => {
        setLoggedIn(true);
    }, []);
    
    return <div>Profile</div>;
}

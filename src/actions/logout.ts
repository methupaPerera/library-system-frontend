"use server";

import { redirect } from "next/navigation";
import { deleteCookies, getRefreshTokenCookie } from "./functions";

export async function logOutUser() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Refresh-Token": `Bearer ${getRefreshTokenCookie()}`,
            },
        });

        deleteCookies();
    } catch (err) {
        return null;
    }

    redirect("/login");
}

"use server";

import { redirect } from "next/navigation";
import { deleteCookies, getRefreshTokenCookie } from "./functions";

export async function logoutUser() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getRefreshTokenCookie()}`,
            },
        });

        if (!res.ok) {
            throw new Error();
        }

        deleteCookies();
    } catch (err) {
        return "Failed to log you out. Please try again later.";
    }

    redirect("/login");
}

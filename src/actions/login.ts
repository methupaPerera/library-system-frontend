"use server";

import { setCookies } from "./functions";
import { redirect } from "next/navigation";

import type { LoginFormInputs } from "@/app/login/page";

// Type for the API response.
export type LoginFormReturns = {
    status: "success" | "failed";
    message: string;
    data: {
        membership_type: "admin" | "member";
        access_token: string;
        refresh_token: string;
    };
};

// Types for cookie data used in setHeader function.
export type CookieData = { name: string; value: string; exp: number };

export async function loginUser(body: LoginFormInputs) {
    const isAuthenticated = {
        // Used to redirect users necessarily.
        stat: false,
        isAdmin: false,
    };

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const { message, data }: LoginFormReturns = await res.json();
        console.log(data)

        if (res.status === 200) {
            // All the data exist, if the status is 200.
            const cookieData: CookieData[] = [
                {
                    name: "access_token",
                    value: data.access_token,
                    exp: 60 * 15,
                },
                {
                    name: "refresh_token",
                    value: data.refresh_token,
                    exp: 60 * 60 * 24,
                },
            ];

            setCookies(...cookieData);

            isAuthenticated.stat = true;

            if (data.membership_type === "admin") {
                isAuthenticated.isAdmin = true;
            }
        } else {
            return message;
        }
    } catch (err) {
        return "Something went wrong. Try again later.";
    }

    if (isAuthenticated.stat) {
        if (isAuthenticated.isAdmin) {
            redirect("/dashboard");
        } else {
            redirect("/profile");
        }
    }
}

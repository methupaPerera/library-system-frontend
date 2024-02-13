import type { CookieData } from "@/typings/main-types";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const body = await request.json();

    const storedCookies = cookies();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const { message, data } = await res.json();

        // Setting cookies after a successful login.
        if (res.status === 200) {
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

            cookieData.forEach((cookie) => {
                storedCookies.set({
                    name: cookie.name,
                    value: cookie.value,
                    httpOnly: true,
                    secure: true,
                    maxAge: cookie.exp,
                });
            });
        }

        return Response.json(
            { message, isAdmin: data.membership_type === "admin" },
            { status: res.status }
        );
    } catch (err) {
        return Response.json(
            {
                message: "Something went wrong. Please try again later.",
            },
            { status: 500 }
        );
    }
}

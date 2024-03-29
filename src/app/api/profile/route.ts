import { cookies } from "next/headers";

export async function GET(request: Request) {
    const storedCookies = cookies();

    try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/profile", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${
                    storedCookies.get("access_token")?.value
                }`,
                "Content-Type": "application/json",
            },
        });

        const { message, data } = await res.json();

        return Response.json({ message, data }, { status: res.status });
    } catch (err) {
        return Response.json(
            {
                message: "Something went wrong. Please try again later.",
            },
            { status: 500 }
        );
    }
}
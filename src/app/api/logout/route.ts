import { cookies } from "next/headers";

export async function POST(request: Request) {
    const storedCookies = cookies();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Refresh-Token": `Bearer ${
                    storedCookies.get("refresh_token")?.value
                }`,
            },
        });

        // Deleting cookies from the frontend in spite of the response.
        storedCookies.getAll().forEach((cookie) => {
            storedCookies.delete(cookie.name);
        });

        return Response.json({});
    } catch (err) {
        return Response.json({});
    }
}

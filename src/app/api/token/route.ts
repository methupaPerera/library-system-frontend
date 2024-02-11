import { cookies } from "next/headers";

export async function POST(request: Request) {
    const storedCookies = cookies();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
            method: "POST",
            headers: {
                "Refresh-Token": `Bearer ${
                    storedCookies.get("refresh_token")?.value
                }`,
                "Content-Type": "application/json",
            },
        });

        const { data } = await res.json();

        if (res.status === 200) { // Updating access token cookie if refreshed.
            storedCookies.set("access_token", data.access_token, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 15,
            });
        } else { // If refrshing failed, cookies will be deleted and user should log in again.
            storedCookies.getAll().forEach((cookie) => {
                storedCookies.delete(cookie.name);
            });
        }

        return Response.json({}, { status: res.status });
    } catch (err) {
        return Response.json({}, { status: 500 });
    }
}

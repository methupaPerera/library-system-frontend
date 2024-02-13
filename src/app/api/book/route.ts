import { cookies } from "next/headers";

export async function POST(request: Request) {
    const body = await request.json();

    const storedCookies = cookies();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${
                    storedCookies.get("access_token")?.value
                }`,
                "Content-Type": "application/json",
            },
        });

        const { message } = await res.json();

        return Response.json({ message }, { status: res.status });
    } catch (err) {
        return Response.json(
            {
                message: "Something went wrong. Please try again later.",
            },
            { status: 500 }
        );
    }
}

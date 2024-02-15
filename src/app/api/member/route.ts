import { cookies } from "next/headers";

export async function GET(request: Request) {
    const storedCookies = cookies();

    const url = new URL(request.url);
    const page = url.searchParams.get("page") ?? 1;
    const name = url.searchParams.get("name") ?? "";

    const fetchUrl = `/member?page=${Number(page) - 1}&name=${name}`;

    try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + fetchUrl, {
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
                data: {},
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const body = await request.json();

    const storedCookies = cookies();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member`, {
            method: "POST",
            body: JSON.stringify(body),
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

export async function PUT(request: Request) {
    const body = await request.json();

    const storedCookies = cookies();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member`, {
            method: "PUT",
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

export async function DELETE(request: Request) {
    const body = await request.json();

    const storedCookies = cookies();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member`, {
            method: "DELETE",
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

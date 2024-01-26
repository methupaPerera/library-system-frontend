import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const access_token = request.cookies.get("access_token")?.value;

    // Users can't continue without logging in.
    if (path !== "/login" && !access_token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Validating the access token.
    const data = await validateToken(access_token);

    // Users can't continue with a mutated access token.
    if (path !== "/login" && data.status === "failed") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Users can't relogin without logging out.
    if ((path === "/login" || path === "/") && data.type === "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Members can't access the pages other than "my-profile".
    if (path !== "/my-profile" && data.type === "member") {
        return NextResponse.redirect(new URL("/my-profile", request.url));
    }
}

// Validates the token by sending a GET request to the server.
async function validateToken(access_token: string | undefined) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/check-token`,
            {
                headers: {
                    Authorization: "Bearer " + access_token,
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await res.json();

        return data;
    } catch (e) {
        return { status: "failed" };
    }
}

export const config = {
    matcher: ["/", "/my-profile", "/login", "/dashboard", "/members", "/books"],
};

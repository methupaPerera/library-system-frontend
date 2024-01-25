import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const access_token = request.cookies.get("access_token")?.value;

    if (path !== "/login" && !access_token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const data = await validateToken(access_token);

    if (path !== "/login" && data.status === "failed") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (path === "/login" && data.type === "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (path !== "/my-profile" && data.type === "member") {
        return NextResponse.redirect(new URL("/my-profile", request.url));
    }
}

async function validateToken(access_token: string | undefined) {
    const res = await fetch("http://localhost:5000/api/check-token", {
        headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}

export const config = {
    matcher: ["/", "/my-profile", "/login", "/dashboard"],
};

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const refresh_token = request.cookies.get("refresh_token")?.value;

    // New users will be redirected to the log in page.
    if (path !== "/login" && !refresh_token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Redirecting users according to the token verification status.
    const [response, isAdmin] = await verifyToken(refresh_token);

    if (path !== "/login" && response !== 200) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if ((path === "/login" || path === "/") && response === 200 && isAdmin) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (path === "/profile" && isAdmin) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (path !== "/profile" && isAdmin === false) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }
}

// Function to verify the refresh token. ----------------------------

type Response = {
    data: {
        membership_type: "Admin" | "Member";
    };
};

async function verifyToken(refresh_token: string | undefined) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
            method: "GET",
            headers: {
                "Refresh-Token": `Bearer ${refresh_token}`,
                "Content-Type": "application/json",
            },
        });

        if (res.status === 200) {
            const { data }: Response = await res.json();
            const isAdmin = data.membership_type === "Admin";

            return [res.status, isAdmin];
        }

        return [res.status, null];
    } catch (e) {
        return [500, null]; // Indicates a failed request.
    }
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/profile",
        "/dashboard",
        "/members",
        "/books",
        "/checkouts",
        "/fines",
        "/admin-profile",
    ],
};

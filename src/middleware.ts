import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const access_token = request.cookies.get("access_token")?.value;
    const refresh_token = request.cookies.get("refresh_token")?.value;

    // Validating the access token by sending a request to the server.
    const { status, data } = await validateToken(access_token, refresh_token);

    console.log(status, data);

    if (status === "updated") {
        const newAccessToken = data.access_token;
        const response = NextResponse.redirect(new URL(path, request.url));

        response.cookies.set({
            name: "access_token",
            value: newAccessToken,
        });

        return response;
    }

    // Users can't continue with a failed or mutated access token.
    if (path !== "/login" && status === "failed") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // All users can't log in without logging out first.
    if (
        (path === "/login" || path === "/") &&
        data.membership_type === "admin" &&
        (status === "success" || status === "updated")
    ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Members can't access pages other than '/my-profile'.
    if (path !== "/my-profile" && data.membership_type === "member") {
        return NextResponse.redirect(new URL("/my-profile", request.url));
    }
}

// Function to validate the access token by sending a GET request to the server.
async function validateToken(
    access_token: string | undefined,
    refresh_token: string | undefined
) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/check-token`,
            {
                headers: {
                    Authorization: "Bearer " + access_token,
                    "Refresh-Token": `${refresh_token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await res.json();

        return data;
    } catch (e) {
        return { status: "failed" }; // Indicates a failed request.
    }
}

export const config = {
    matcher: ["/", "/my-profile", "/login", "/dashboard", "/members", "/books"],
};

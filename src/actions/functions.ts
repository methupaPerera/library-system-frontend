import { cookies } from "next/headers";

import type { CookieData } from "./login";

type RefreshTokenReturns = {
    status: "success" | "failed";
    message: string;
    data: {
        access_token: string;
    };
};

const storedCookies = cookies();

// Gets the access token from the stored cookies.
export function getAccessTokenCookie(): string | undefined {
    const accessToken = storedCookies.get("access_token")?.value;
    return accessToken;
}

// Gets the refresh token from the stored cookies.
export function getRefreshTokenCookie(): string | undefined {
    const refreshToken = storedCookies.get("refresh_token")?.value;
    return refreshToken;
}

// Refreshes the access token by sending a request to the server.
export async function refreshToken() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/refresh-token`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Refresh-Token": `Bearer ${getRefreshTokenCookie()}`,
                },
            }
        );

        const { data }: RefreshTokenReturns = await res.json();

        if (res.status === 200) {
            // If the token has been refreshed, updates it by sending it as a cookie.
            setCookies(
                ...[
                    {
                        name: "access_token",
                        value: data.access_token,
                        exp: 60 * 15,
                    },
                ]
            );
        }

        return res.status; // Returns the status code to redirect user necessarily.
    } catch (err) {
        return 403; // Returns the 403 also in errors to redirect user necessarily.
    }
}

// Sets all the received cookies.
export function setCookies(...data: CookieData[]): void {
    for (const cookie of data) {
        const cookieConfig = {
            name: cookie.name,
            value: cookie.value,
            httpOnly: true,
            secure: true,
            maxAge: cookie.exp,
        };

        storedCookies.set(cookieConfig);
    }
}

// Deletes all the cookies.
export function deleteCookies() {
    storedCookies.getAll().forEach((cookie) => {
        storedCookies.delete(cookie.name);
    });
}

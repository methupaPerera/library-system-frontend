import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getAccessTokenCookie(): string | undefined {
    const tokenCookie = document.cookie
        .split(";")
        .find((cookie) => cookie.startsWith("access_token"))
        ?.split("=")[1];

    return tokenCookie;
}

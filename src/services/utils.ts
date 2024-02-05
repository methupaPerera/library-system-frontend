import { toast } from "sonner";

export class Utils {
    constructor() {}

    // Common function for fetching data. ---------------------------
    async fetchResponse(url: string, method: string, body?: any) {
        const tId = toast.loading("Please wait...");

        try {
            const res = await fetch(url, {
                method: method,
                body: body && JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${this.getAccessTokenCookie()}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            toast.dismiss(tId);

            return data;
        } catch (err) {
            toast.dismiss(tId);
            toast("An error occurred.");

            return null;
        }
    }

    // Method to extract and return the access token from the cookies.
    // Returns undefined if the access token is not found.
    getAccessTokenCookie(): string | undefined {
        const tokenCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.trim().startsWith("access_token"))
            ?.split("=")[1];

        return tokenCookie;
    }

    // Method to extract and return the refresh token from the cookies.
    // Returns undefined if the refresh token is not found.
    getRefreshTokenCookie(): string | undefined {
        const tokenCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.startsWith("refresh_token"))
            ?.split("=")[1];

        return tokenCookie;
    }

    // Method to format the dates coming from db, in 'yyyy/mm/dd' format.
    formatDate(date: string): string {
        const res = new Date(date);

        const year = res.getFullYear();
        const month = (res.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-indexed.
        const day = res.getDate().toString().padStart(2, "0");

        const formattedDate = `${year}/${month}/${day}`;

        return formattedDate;
    }
}

const utils = Object.freeze(new Utils());

export default utils;

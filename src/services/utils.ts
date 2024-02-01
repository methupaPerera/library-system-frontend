export class Utils {
    constructor() {}

    // Method to extract and return the access token from the cookies.
    // Returns undefined if the access token is not found.
    getAccessTokenCookie(): string | undefined {
        const tokenCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.startsWith("access_token"))
            ?.split("=")[1];

        return tokenCookie;
    }

    // Method to format the dates coming from db, in 'yyyy/mm/dd' format.
    formatDate(date: string): string {
        const res = new Date(date);

        const year = res.getFullYear();
        const month = (res.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-indexed
        const day = res.getDate().toString().padStart(2, "0");

        const formattedDate = `${year}/${month}/${day}`;

        return formattedDate;
    }
}

const utils = Object.freeze(new Utils());

export default utils;

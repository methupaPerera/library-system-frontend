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
}

const utils = Object.freeze(new Utils());

export default utils;

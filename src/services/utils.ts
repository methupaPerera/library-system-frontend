export class Utils {
    constructor() {}

    // Extracts and returns the access token from the cookies. ------
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

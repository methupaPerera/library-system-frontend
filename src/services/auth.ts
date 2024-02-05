import type {
    AuthProperties,
    LoginFormInputs,
    LoginFormReturns,
    PasswordFormInputs,
    PasswordFormReturns,
} from "@/typings/auth-types";

import { Utils } from "./utils";
import { toast } from "sonner";

class Auth extends Utils implements AuthProperties {
    // API endpoint URLs.
    private baseUrl: string | undefined;
    private loginUrl: string;
    private passwordUrl: string;

    constructor(apiUrl: string | undefined) {
        super();

        this.baseUrl = apiUrl;
        this.loginUrl = `${apiUrl}/login`;
        this.passwordUrl = `${apiUrl}/password`;
    }

    // Method to submit login data and log in the user. -------------
    async submitLogin(formData: LoginFormInputs) {
        const { status, message, data }: LoginFormReturns =
            await this.fetchResponse(this.loginUrl, "POST", formData);

        toast(message);

        if (status !== "success") {
            return;
        }

        // Creating the access token cookie with expiration time.
        document.cookie = `access_token=${data.access_token};`;
        document.cookie = `refresh_token=${data.refresh_token};`;

        location.reload();
    }

    // Method to submit password data and update it.
    async submitPassword(formData: PasswordFormInputs) {
        const { status, message }: PasswordFormReturns =
            await this.fetchResponse(this.passwordUrl, "PATCH", formData);

        if (status !== "success") {
            toast(message);
            return;
        }

        toast(`${message} Please log in again.`);

        // Clearing the access token cookie.
        document.cookie =
            "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie =
            "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        setTimeout(() => {
            location.reload();
        }, 1000);
    }

    // Method to log out the user by removing the access token.
    handleLogout() {
        toast("Successfully logged out.");

        // Clearing the access tokens.
        document.cookie =
            "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie =
            "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        setTimeout(() => {
            location.reload();
        }, 300);
    }

    async checkTokens() {
        try {
            const res = await fetch(`${this.baseUrl}/check-token`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.getAccessTokenCookie()}`,
                    "Refresh-Token": `Bearer ${this.getRefreshTokenCookie()}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (data.status !== "success") {
                toast("An error occurred.");
                this.handleLogout();
            }
        } catch (err) {
            toast("An error occurred.");
            return null;
        }
    }
}

const auth = Object.freeze(new Auth(process.env.NEXT_PUBLIC_API_URL));

export default auth;

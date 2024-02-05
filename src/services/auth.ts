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
    private loginUrl: string;
    private passwordUrl: string;

    constructor(apiUrl: string | undefined) {
        super();

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

        // Setting the expiration time for the access token cookie.
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 8 * 60 * 60 * 1000);

        // Creating the access token cookie with expiration time.
        document.cookie = `access_token=${
            data.access_token
        }; expires=${expirationTime.toUTCString()};`;

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

        setTimeout(() => {
            location.reload();
        }, 1000);
    }

    // Method to log out the user by removing the access token.
    handleLogout() {
        toast("Successfully logged out.");

        // Clearing the access token cookie.
        document.cookie =
            "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        setTimeout(() => {
            location.reload();
        }, 300);
    }
}

const auth = Object.freeze(new Auth(process.env.NEXT_PUBLIC_API_URL));

export default auth;

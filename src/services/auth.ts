import type {
    AuthProperties,
    LoginFormInputs,
    LoginFormReturns,
    PasswordFormInputs,
    PasswordFormReturns,
} from "@/typings/auth-types";

import { Utils } from "./utils";
import { toast } from "sonner";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

class Auth extends Utils implements AuthProperties {
    // API endpoint URLs.
    private baseUrl: string | undefined;
    private loginUrl: string;
    private passwordUrl: string;

    constructor(apiUrl: string | undefined, router: AppRouterInstance) {
        super(router);

        this.baseUrl = apiUrl;
        this.loginUrl = `${apiUrl}/login`;
        this.passwordUrl = `${apiUrl}/password`;
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
        // TODO: Create a logout route in backend and remove the refresh token and everything.
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
}

export default Auth;

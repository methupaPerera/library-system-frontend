import type {
    AuthProperties,
    LoginInputs,
    LoginReturns,
    UpdatePasswordInputs,
    UpdatePasswordReturns,
} from "@/typings/auth-types";

import { Utils } from "./utils";
import { toast } from "sonner";

class Auth extends Utils implements AuthProperties {
    // API endpoint URLs.
    private loginUrl: string;
    private updatePasswordUrl: string;

    constructor(apiUrl: string | undefined) {
        super();

        this.loginUrl = `${apiUrl}/login`;
        this.updatePasswordUrl = `${apiUrl}/password`;
    }

    // Method to submit login data and log in the user.
    async submitLogin(formData: LoginInputs) {
        const tId = toast.loading("Please wait...");

        try {
            const res = await fetch(this.loginUrl, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const { status, message, data }: LoginReturns = await res.json();

            toast.dismiss(tId);
            toast(message);

            if (status !== "success") {
                return;
            }

            // Setting the expiration time for the access token cookie.
            const expirationTime = new Date();
            expirationTime.setTime(
                expirationTime.getTime() + 8 * 60 * 60 * 1000
            );

            // Creating the access token cookie with expiration time.
            document.cookie = `access_token=${
                data.access_token
            }; expires=${expirationTime.toUTCString()};`;

            location.reload();
        } catch (e) {
            toast.dismiss(tId);
            toast("Failed to submit login.");
        }
    }

    // Method to submit password data and update it.
    async submitUpdatePassword(formData: UpdatePasswordInputs) {
        const tId = toast.loading("Please wait...");

        try {
            const res = await fetch(this.updatePasswordUrl, {
                method: "PATCH",
                body: JSON.stringify(formData),
                headers: {
                    Authorization: `Bearer ${this.getAccessTokenCookie()}`,
                    "Content-Type": "application/json",
                },
            });

            const { status, message }: UpdatePasswordReturns = await res.json();

            toast.dismiss(tId);

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
        } catch (e) {
            toast.dismiss(tId);
            toast("Failed to submit the new password.");
        }
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

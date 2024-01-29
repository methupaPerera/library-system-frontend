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
    // Links of the api endpoints.
    private loginUrl: string;
    private updatePasswordUrl: string;

    constructor(apiUrl: string | undefined) {
        super();

        // Defining routes with the base api url.
        this.loginUrl = `${apiUrl}/login`;
        this.updatePasswordUrl = `${apiUrl}/password`;
    }

    // Submits the login data and logs in the user. -----------------
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

            document.cookie = `access_token=${data.access_token}`;
            location.reload();
        } catch (e) {
            toast.dismiss(tId);
            toast("Failed to submit login.");
        }
    }

    // Submits the password data and updates it. --------------------
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

    // Logs the user out by removing the access token. --------------
    handleLogout() {
        toast("Successfully logged out.");

        document.cookie =
            "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        setTimeout(() => {
            location.reload();
        }, 500);
    }
}

const auth = Object.freeze(new Auth(process.env.NEXT_PUBLIC_API_URL));

export default auth;

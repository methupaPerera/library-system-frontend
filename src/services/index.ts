import type {
    LoginInputs,
    LoginReturns,
    UpdatePasswordInputs,
    UpdatePasswordReturns,
} from "@/typings";

import { toast } from "sonner";
import axios from "axios";
import { getAccessTokenCookie } from "@/lib/utils";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

// --------------------- AUTH ---------------------------------------------------

export async function submitLogin(formData: LoginInputs) {
    const tId = toast.loading("Please wait...");

    try {
        const res = await fetch(`${apiURL}/login`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const { status, message, data }: LoginReturns = await res.json();

        toast.dismiss(tId);

        if (status === "success") {
            toast(message);
            document.cookie = `access_token=${data.access_token}`;
            location.reload();
        } else {
            toast(message);
        }
    } catch (e) {
        toast.dismiss(tId);
        toast("Failed to submit login.");
    }
}

export async function submitUpdatePassword(formData: UpdatePasswordInputs) {
    const tId = toast.loading("Please wait...");

    const res = await fetch(`${apiURL}/password`, {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: {
            Authorization: `Bearer ${getAccessTokenCookie()}`,
            "Content-Type": "application/json",
        },
    });

    const { status, message }: UpdatePasswordReturns = await res.json();

    toast.dismiss(tId);

    if (status === "success") {
        toast(message + " Please log in again.");
        document.cookie =
            "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        setTimeout(() => {
            location.reload();
        }, 1000);
    } else {
        toast(message);
    }
}

// --------------------- USER LOGOUT --------------------------------------------

export function handleLogout() {
    toast("Successfully logged out.");

    setTimeout(() => {
        document.cookie =
            "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        location.reload();
    }, 500);
}

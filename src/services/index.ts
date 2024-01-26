import type { LoginInputs, LoginReturns } from "@/typings";

import { toast } from "sonner";

// --------------------- USER LOGIN ---------------------------------------------

export async function submitLogin(formData: LoginInputs) {
    const tId = toast.loading("Please wait...");

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(formData),
        });

        const data: LoginReturns = await res.json();

        toast.dismiss(tId);

        if (data.status === "success") {
            toast(data.message);
            document.cookie = `access_token=${data.access_token}`;
            location.reload();
        } else {
            toast(data.message);
        }
    } catch (e) {
        toast.dismiss(tId);
        toast("Failed to submit login");
    }
}

// --------------------- USER LOGOUT --------------------------------------------

export function handleLogout() {
    toast("Successfully logged out");

    setTimeout(() => {
        document.cookie =
            "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        location.reload();
    }, 500);
}

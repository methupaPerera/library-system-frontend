import type { LoginInputs, LoginReturns } from "@/typings";

import { toast } from "sonner";

export async function submitLogin(formData: LoginInputs) {
    toast("Please wait !");
    const res = await fetch("https://library-system-backend-gray.vercel.app/api/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(formData),
    });

    const data: LoginReturns = await res.json();

    if (data.status === "success") {
        toast("Login success !");
        document.cookie = `access_token=${data.access_token}`;
        location.reload();
    } else {
        toast("Failed to log you in !");
    }
}

export function handleLogout() {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    location.reload();
}

import { toast } from "sonner";

export async function UseFetch(
    url: string,
    method: string,
    body?: any,
    isNotification: boolean = true
) {
    let id;

    if (isNotification) {
        id = toast.loading("Please wait...");
    }

    const res = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
    });

    if (res.status === 401) {
        const res = await fetch("/api/token", { method: "POST" });

        if (res.status !== 200) {
            location.reload();
        } else {
            return await UseFetch(url, method, body, isNotification);
        }
    }

    const data = await res.json();

    if (isNotification) {
        toast.dismiss(id);
    }

    return { ...data, status: res.status };
}

import { toast } from "sonner";

export async function useFetch(url: string, method: string, body?: any) {
    const id = toast.loading("Please wait...");

    const res = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
    });

    if (res.status === 401) {
        const res = await fetch("/api/token", { method: "POST" });

        if (res.status !== 200) {
            location.reload();
        } else {
            return await useFetch(url, method, body);
        }
    }

    const data = await res.json();
    toast.dismiss(id);

    return { ...data, status: res.status };
}

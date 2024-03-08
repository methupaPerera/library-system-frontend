"use client";

// Importing types.
import { LoginFormInputs } from "@/typings/auth-types";

// Importing utilities.
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/contexts/context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Importing components.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
    const router = useRouter();

    const { register, handleSubmit } = useForm<LoginFormInputs>();
    const { setLoggedIn } = useAppContext();
    const [isPending, setPending] = useState(false);

    // Action for the form submission.
    async function action(data: LoginFormInputs) {
        setPending(true);

        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(data),
        });

        const { message, isAdmin } = await res.json();

        // Users can't login if anything went wrong.
        if (res.status !== 200) {
            toast.error(message);
            setPending(false);

            return;
        }

        const id = toast.success(message);

        setTimeout(() => {
            toast.dismiss(id);
        }, 2000);

        if (isAdmin) {
            router.push("dashboard");
        } else {
            router.push("/profile");
        }
    }

    useEffect(() => {
        setLoggedIn(false);
    }, []);

    return (
        <form
            method="POST"
            onSubmit={handleSubmit((data) => action(data))}
            className="mx-auto mt-32 sm:mt-24 w-11/12 sm:w-96 px-8 py-6 flex flex-col gap-6 shadow-[5px_0_1rem] shadow-gray-300 dark:bg-secondary dark:shadow-none dark:border dark:border-muted rounded-xl"
        >
            <h1 className="text-4xl font-extrabold text-secondary-foreground">
                Log in
            </h1>

            <div className="flex flex-col gap-3">
                <Input
                    type="text"
                    placeholder="Member ID"
                    required
                    {...register("member_id", { required: true })}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    required
                    {...register("password", { required: true })}
                />
            </div>

            <Button type="submit" disabled={isPending}>
                {isPending ? "Logging in..." : "Log in"}
            </Button>
        </form>
    );
}

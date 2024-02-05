"use client";

// Importing types.
import type { LoginFormInputs } from "@/typings/auth-types";

// Importing utilities.
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import auth from "@/services/auth";

// Importing components.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
    const { register, handleSubmit } = useForm<LoginFormInputs>();

    // Action for the enter key press.
    function action(data: LoginFormInputs) {
        auth.submitLogin(data);
    }

    // Clears the access token from cookies and handles the enter key press.
    useEffect(() => {
        document.cookie =
            "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        function handleKeyPress(event: KeyboardEvent) {
            if (event.key !== "Enter") return;
            handleSubmit((data) => action(data));
        }

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
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

            <Button type="submit">Log in</Button>
        </form>
    );
}

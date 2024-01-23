"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { LoginInputs, LoginReturns } from "@/typings";

export default function Login() {
    const { register, handleSubmit, formState } = useForm<LoginInputs>();

    async function onSubmit(formData: LoginInputs) {
        const res = await fetch("http://localhost:5000/api/login", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(formData),
        });

        const data: LoginReturns = await res.json();

        if (data.status === "success") {
            toast("Login success !");
            localStorage.setItem("access_token", data.access_token)
        } else {
            toast("Failed to log you in !");
        }
    }

    return (
        <form
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-16 w-11/12 sm:w-96 py-6 px-8 rounded-xl mx-auto shadow-lg shadow-gray-300 dark:shadow-none dark:border dark:border-muted"
        >
            <h1 className="font-extrabold text-4xl text-secondary-foreground">
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

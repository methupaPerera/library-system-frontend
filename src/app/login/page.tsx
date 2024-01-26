"use client";

import type { LoginInputs } from "@/typings";

import { useForm } from "react-hook-form";
import { submitLogin } from "@/services";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
    const { register, handleSubmit } = useForm<LoginInputs>();

    return (
        <form
            method="POST"
            onSubmit={handleSubmit((data) => submitLogin(data))}
            className="mx-auto mt-32 sm:mt-24 w-11/12 sm:w-96 px-8 py-6 flex flex-col gap-6 shadow-[5px_0_1rem] shadow-gray-300 dark:bg-secondary dark:shadow-none dark:border dark:border-muted rounded-xl"
        >
            <h1 className="text-4xl text-secondary-foreground font-extrabold">
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

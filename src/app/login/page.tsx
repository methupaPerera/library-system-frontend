"use client";

// Importing utilities.
import { useForm } from "react-hook-form";
import { loginUser } from "@/actions/login";

// Importing components.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useEffect } from "react";
import { useAppContext } from "@/contexts/context";

// Type for the log in form inputs.
export type LoginFormInputs = {
    member_id: string;
    password: string;
};

export default function Login() {
    const { register, handleSubmit } = useForm<LoginFormInputs>();
    const { setLoggedIn } = useAppContext();

    // Action for the form submission.
    async function action(data: LoginFormInputs) {
        const id = toast.loading("Please wait...");

        const message = await loginUser(data);

        toast.dismiss(id);
        message && toast.error(message);
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

            <Button type="submit">Log in</Button>
        </form>
    );
}

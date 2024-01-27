"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { FaPlus } from "react-icons/fa6";
import { Input } from "../ui/input";
import { submitCreateMember } from "@/services";
import { CreateMemberInputs } from "@/typings";

export default function CreateMemberForm() {
    const [membership, setMembership] = useState<"admin" | "member">("member");
    const [isCreated, setCreated] = useState<{
        state: boolean;
        info: { member_id: string; password: string };
    }>({ state: false, info: { member_id: " ", password: " " } });

    const { register, handleSubmit } = useForm<CreateMemberInputs>();

    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key !== "Enter") return;

            handleSubmit(async (data) => {
                const info = await submitCreateMember({
                    ...data,
                    membership_type: membership,
                });

                if (info?.status === "success") {
                    setCreated({ state: true, info: info.data });
                }
            });
        }

        window.addEventListener("keydown", handleKeyPress);
        return window.removeEventListener("keydown", handleKeyPress);
    });

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        size="sm"
                        className="flex gap-1.5 fixed bottom-6 right-6"
                    >
                        Add member <FaPlus />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add New Member.</SheetTitle>
                    </SheetHeader>

                    <form
                        method="POST"
                        onSubmit={handleSubmit(async (data) => {
                            const info = await submitCreateMember({
                                ...data,
                                membership_type: membership,
                            });

                            if (info?.status === "success") {
                                setCreated({ state: true, info: info.data });
                            }
                        })}
                        className="mt-8 flex flex-col gap-3"
                    >
                        <Input
                            type="text"
                            placeholder="Full Name"
                            required
                            {...register("full_name", { required: true })}
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            required
                            {...register("email", { required: true })}
                        />

                        <div className="flex items-center gap-3">
                            <Input
                                type="text"
                                placeholder="Address"
                                required
                                {...register("address", { required: true })}
                            />
                            <Input
                                type="tel"
                                placeholder="Phone"
                                required
                                {...register("phone_number", {
                                    required: true,
                                })}
                            />
                        </div>

                        <Select
                            onValueChange={(value: "admin" | "member") =>
                                setMembership(value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue
                                    defaultValue={membership}
                                    placeholder="Membership Type"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Membership Types</SelectLabel>
                                    <SelectItem value="member">
                                        Member
                                    </SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <SheetClose
                            type="submit"
                            className={buttonVariants() + " mt-6"}
                        >
                            Submit
                        </SheetClose>
                    </form>
                </SheetContent>
            </Sheet>

            <AlertDialog
                open={isCreated.state}
                onOpenChange={() =>
                    setCreated({ ...isCreated, state: !isCreated.state })
                }
            >
                <AlertDialogContent className="w-96">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Here's the new member's member id and the password!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="pt-3 pb-1 flex flex-col justify-center mx-auto text-2xl">
                            <span>
                                ID -{" "}
                                <span className="font-semibold">
                                    {isCreated.info.member_id}
                                </span>
                            </span>
                            <span>
                                Password -{" "}
                                <span className="font-semibold">
                                    {isCreated.info.password}
                                </span>
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

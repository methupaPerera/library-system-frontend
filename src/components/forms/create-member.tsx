"use client";

// Importing types.
import type {
    CreateMemberInputs,
    NewMemberModalState,
} from "@/typings/member-types";
import type { MembershipTypes } from "@/typings/member-types";

// Importing utilities.
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Importing components.
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "../ui/input";
import {
    Sheet,
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

// Importing icons.
import { FaPlus } from "react-icons/fa6";
import { useAppContext } from "@/contexts/context";

export default function CreateMemberForm() {
    const { admin } = useAppContext();
    // Container for the membership type input.
    const [membership, setMembership] = useState<MembershipTypes>("member");

    // Triggers the modal dialog with the new member's ID and password.
    const [isCreated, setCreated] = useState<NewMemberModalState>({
        state: false,
        info: { member_id: "", password: "" },
    });

    const { register, handleSubmit } = useForm<CreateMemberInputs>();

    // Function for handling data submission and managing returned data.
    async function handleReqRes(data: CreateMemberInputs) {
        const info = await admin.submitCreateMember({
            ...data,
            membership_type: membership,
        });

        if (info?.status === "success") {
            setCreated({
                state: true,
                // Using a type assertion because the 'data' key exists when the status is "success".
                info: info.data as {
                    member_id: string;
                    password: string;
                },
            });
        }
    }

    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key !== "Enter") return;

            handleSubmit(handleReqRes);
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
                        onSubmit={handleSubmit(handleReqRes)}
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
                            onValueChange={(value: MembershipTypes) =>
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
                                    <SelectItem value="member">
                                        Member
                                    </SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Button
                            type="submit"
                            className={buttonVariants() + " mt-6"}
                        >
                            Submit
                        </Button>
                    </form>
                </SheetContent>
            </Sheet>

            {/* Modal dialog for displaying the member's ID and password. */}

            <AlertDialog
                open={isCreated.state}
                onOpenChange={() =>
                    setCreated({ ...isCreated, state: !isCreated.state })
                }
            >
                <AlertDialogContent className="w-96">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Here&apos;s the new member&apos;s member id and the
                            password!
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

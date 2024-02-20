"use client";

// Importing types.
import type {
    MemberFormInputs,
    MemberFormProps,
    NewMemberModalState,
} from "@/typings/member-types";
import type { MembershipTypes } from "@/typings/member-types";

// Importing utilities.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "@/hooks";

// Importing components.
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "../ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
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
import { toast } from "sonner";

export default function MemberForm({
    isFormOpen,
    setFormOpen,
}: MemberFormProps) {
    const { register, handleSubmit, reset } = useForm<MemberFormInputs>();

    // Container for the membership type input.
    const [membership, setMembership] = useState<MembershipTypes>("member");

    // Triggers the modal dialog with the new member's ID and password.
    const [isCreated, setCreated] = useState<NewMemberModalState>({
        state: false,
        info: { member_id: "", password: "" },
    });

    // Action for the data submission.
    async function action(data: MemberFormInputs) {
        const {
            message,
            data: info,
            status,
        } = await useFetch("/api/member", "POST", {
            ...data,
            membership_type: membership,
        });

        if (status === 200) {
            setCreated({
                ...isCreated,
                state: true,
                info: { member_id: info.member_id, password: info.password },
            });

            reset();
        } else {
            toast.error(message);
        }
    }

    return (
        <>
            <Sheet open={isFormOpen} onOpenChange={(open) => setFormOpen(open)}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add New Member.</SheetTitle>
                    </SheetHeader>

                    <form
                        onSubmit={handleSubmit((data) => action(data))}
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
                            value={membership}
                            onValueChange={(value: MembershipTypes) =>
                                setMembership(value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Membership Type" />
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

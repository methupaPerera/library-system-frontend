"use client";

// Importing types.
import type {
    EditMemberFormInputs,
    EditMemberFormProps,
    MembershipTypes,
} from "@/typings/member-types";

// Importing utilities.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { makeFetch } from "@/functions";

// Importing components.
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export default function MemberEditForm({
    memberData,
    isFormOpen,
    setFormOpen,
    refresh,
}: EditMemberFormProps) {
    const { register, handleSubmit, reset } = useForm<EditMemberFormInputs>();

    // Container for the genre input.
    const [membership, setMembership] = useState<undefined | MembershipTypes>(
        memberData.membership_type
    );

    // Action for the data submission.
    async function action(data: EditMemberFormInputs) {
        const { message, status } = await makeFetch("/api/member", "PUT", {
            ...data,
            member_id: memberData.member_id,
            membership_type: membership,
        });

        if (status === 200) {
            toast.success(message);
            reset();
            setFormOpen(false);

            setTimeout(() => {
                refresh();
            }, 500);
        } else {
            toast.error(message);
        }
    }

    return (
        <Sheet open={isFormOpen} onOpenChange={() => setFormOpen(false)}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Update Member.</SheetTitle>
                </SheetHeader>

                <form
                    onSubmit={handleSubmit((data) => action(data))}
                    className="mt-8 flex flex-col gap-3"
                >
                    <Input
                        type="text"
                        defaultValue={memberData?.full_name}
                        placeholder="Full Name"
                        required
                        {...register("full_name", { required: true })}
                    />

                    <Input
                        type="text"
                        defaultValue={memberData?.email}
                        placeholder="Email"
                        required
                        {...register("email", { required: true })}
                    />

                    <div className="flex items-center gap-3">
                        <Input
                            type="text"
                            defaultValue={memberData?.phone_number}
                            placeholder="Phone"
                            required
                            {...register("phone_number", { required: true })}
                        />
                        <Input
                            type="text"
                            defaultValue={memberData?.address}
                            placeholder="Address"
                            required
                            {...register("address", { required: true })}
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
                                <SelectItem value="Member">Member</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Button
                        type="submit"
                        className={`mt-6 ${buttonVariants()}`}
                    >
                        Submit
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}

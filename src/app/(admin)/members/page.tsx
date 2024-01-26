"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { FaPlus } from "react-icons/fa6";

export default function Members() {
    const { register, handleSubmit } = useForm();

    function submitMemberData(data: any) {}

    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key !== "Enter") return;

            handleSubmit((data) => submitMemberData(data));
        }
    });

    return (
        <div className="pt-3 px-4">
            <h3 className="font-semibold text-2xl text-muted-foreground">
                Members
            </h3>

            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        size="sm"
                        className="flex gap-1.5 fixed bottom-4 right-4"
                    >
                        Add member <FaPlus />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add New Member.</SheetTitle>
                    </SheetHeader>

                    <form>
                        <input type="text" />
                    </form>
                    
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Submit</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}

"use client";

import { useState } from "react";

import { CreateBookForm } from "@/components/forms";
import { BooksTable } from "@/components/tables";

export default function Books() {
    const [isFormOpen, setFormOpen] = useState<boolean>(false);

    return (
        <div className="px-4 pt-3">
            <h3 className="text-2xl font-semibold text-muted-foreground">
                Books
            </h3>

            <CreateBookForm isFormOpen={isFormOpen} setFormOpen={setFormOpen} />

            <div className="mt-1">
                <BooksTable />
            </div>
        </div>
    );
}

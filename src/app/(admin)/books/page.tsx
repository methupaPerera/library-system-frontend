import { CreateBookForm } from "@/components/forms";
import { BooksTable } from "@/components/tables";

export default function Books() {
    return (
        <div className="px-4 pt-3">
            <h3 className="text-2xl font-semibold text-muted-foreground">
                Books
            </h3>

            <CreateBookForm />

            <div className="mt-4">
                <BooksTable />
            </div>
        </div>
    );
}

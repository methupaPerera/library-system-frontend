import { CreateBookForm } from "@/components/forms";

export default function Books() {
    return (
        <div className="pt-3 px-4">
            <h3 className="font-semibold text-2xl text-muted-foreground">
                Books
            </h3>
            <CreateBookForm />
        </div>
    );
}

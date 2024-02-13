import { CreateMemberForm } from "@/components/forms";

export default function Members() {
    return (
        <div className="pt-3 px-4">
            <h3 className="font-semibold text-2xl text-muted-foreground">
                Members
            </h3>
            <CreateMemberForm />
        </div>
    );
}

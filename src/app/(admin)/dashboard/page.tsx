import { StaticsCard } from "@/components";

export default function Dashboard() {
    return (
        <div className="pt-3 px-4">
            <h3 className="font-semibold text-2xl text-muted-foreground">
                Dashboard
            </h3>
            <div className="pt-4">
                <StaticsCard caption="Books" value={226} />
            </div>
        </div>
    );
}

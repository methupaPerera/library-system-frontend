import type { StaticsCardProps } from "@/typings";

export default function StaticsCard({ caption, value }: StaticsCardProps) {
    return (
        <div className="p-4 bg-background shadow-lg shadow-gray-300 dark:shadow-none dark:border dark:border-muted rounded-lg">
            <h5 className="text-gray-400 font-semibold">{caption}</h5>
            <p className="mt-2 font-bold text-3xl">{value}</p>
        </div>
    );
}

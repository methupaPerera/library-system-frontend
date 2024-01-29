import { StaticsCardProps } from "@/typings/prop-types";

export default function StaticsCard({
    caption,
    value,
    Icon,
}: StaticsCardProps) {
    return (
        <div className="py-4 px-6 bg-background shadow-lg shadow-gray-300 dark:shadow-none dark:border dark:border-muted rounded-lg">
            <div>
                <h5 className="text-gray-400 font-semibold">{caption}</h5>
                <p className="font-bold text-3xl">{value}</p>
            </div>
            <Icon className="text-5xl float-right" />
        </div>
    );
}

import { StaticsCardProps } from "@/typings/comp-props";

export default function StaticsCard({
    caption,
    value,
    Icon,
}: StaticsCardProps) {
    return (
        <div className="flex flex-col py-4 px-6 bg-background shadow-lg shadow-gray-300 dark:shadow-none dark:border dark:border-muted rounded-lg">
            <div>
                <Icon className="text-[4rem]" />
            </div>
            <div>
                <h5 className="text-gray-400 font-semibold -mb-1">{caption}</h5>
                <p className="font-bold text-3xl">{value}</p>
            </div>
        </div>
    );
}

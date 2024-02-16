import { StaticsCardProps } from "@/typings/comp-props";
import { Skeleton } from "./ui/skeleton";

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
                <div className="font-bold text-3xl">
                    {value || value === 0 ? (
                        value
                    ) : (
                        <Skeleton className="mt-2 w-1/2 h-6" />
                    )}
                </div>
            </div>
        </div>
    );
}

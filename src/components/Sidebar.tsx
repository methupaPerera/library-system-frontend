"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
    LayoutDashboard,
    LucideProps,
    Users,
    BookOpenText,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent } from "react";

export default function Sidebar() {
    return (
        <div className="pt-12 px-2 w-48 flex flex-col gap-1 bg-background h-[calc(100vh-3.5rem)] border-r border-muted fixed bottom-0 left-0 z-50">
            <SidebarLink route="dashboard" Icon={LayoutDashboard} />
            <SidebarLink route="members" Icon={Users} />
            <SidebarLink route="books" Icon={BookOpenText} />
        </div>
    );
}

function SidebarLink({
    route,
    Icon,
}: {
    route: string;
    Icon: ForwardRefExoticComponent<LucideProps>;
}) {
    const path = usePathname();

    return (
        <Link
            href={route}
            className={
                buttonVariants({
                    size: "lg",
                    variant: !(path === "/" + route) ? "outline" : "default",
                }) + " !w-[100%] !text-base !justify-start capitalize"
            }
        >
            <Icon className="pr-2" /> {route}
        </Link>
    );
}

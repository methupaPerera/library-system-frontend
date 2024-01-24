"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { LayoutDashboard, LucideProps } from "lucide-react";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent } from "react";

export default function Sidebar() {
    return (
        <aside className="pt-12 px-2 w-56 flex flex-col gap-1 bg-background h-[calc(100vh-3.5rem)] border-r border-muted fixed bottom-0 left-0 z-50">
            <SidebarLink route="dashboard" Icon={LayoutDashboard} />
            <SidebarLink route="settings" Icon={LayoutDashboard} />
            <SidebarLink route="users" Icon={LayoutDashboard} />
        </aside>
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

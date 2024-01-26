"use client";

import type { SidebarLinkProps } from "@/typings";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

import { BiSolidDashboard } from "react-icons/bi";
import { ImBooks } from "react-icons/im";
import { BsFillPeopleFill } from "react-icons/bs";

// --------------------- SIDEBAR ------------------------------------------------

export default function Sidebar() {
    return (
        <div className="w-16 h-[calc(100vh-3.5rem)] pt-14 px-1.5 flex flex-col gap-1 bg-background border-r border-muted">
            <SidebarLink route="dashboard" Icon={<BiSolidDashboard />} />
            <SidebarLink route="members" Icon={<BsFillPeopleFill />} />
            <SidebarLink route="books" Icon={<ImBooks />} />
        </div>
    );
}

// --------------------- LINK STYLER FOR SIDEBAR --------------------------------

function SidebarLink({ route, Icon }: SidebarLinkProps) {
    const path = usePathname();

    return (
        <Link
            href={route}
            className={
                buttonVariants({
                    size: "lg",
                    variant: !(path === "/" + route) ? "outline" : "default",
                }) + " !text-2xl !px-1"
            }
        >
            {Icon}
        </Link>
    );
}

"use client";

// Imporing types.
import type { SidebarLinkProps } from "@/typings/prop-types";

// Imporing components.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Importing icons.
import { BiSolidDashboard } from "react-icons/bi";
import { ImBooks } from "react-icons/im";
import { BsFillPeopleFill } from "react-icons/bs";

// Sidebar. -------------------------------------------------------------------
export default function Sidebar() {
    return (
        <div className="w-16 h-[calc(100vh-3.5rem)] pt-14 px-1.5 flex flex-col gap-1 bg-background border-r border-muted fixed">
            <SidebarLink route="dashboard" Icon={<BiSolidDashboard />} />
            <SidebarLink route="members" Icon={<BsFillPeopleFill />} />
            <SidebarLink route="books" Icon={<ImBooks />} />
        </div>
    );
}

// Link styler for sidebar links. ---------------------------------------------
function SidebarLink({ route, Icon }: SidebarLinkProps) {
    const path = usePathname();

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Link
                        href={route}
                        className={
                            buttonVariants({
                                size: "lg",
                                variant: !(path === "/" + route)
                                    ? "outline"
                                    : "default",
                            }) + " !text-2xl !px-3"
                        }
                    >
                        {Icon}
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p className="capitalize">{route}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
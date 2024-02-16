"use client";

// Importing types.
import type { SidebarLinkProps } from "@/typings/comp-props";

// Importing components.
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
import { IoNewspaperSharp } from "react-icons/io5";
import { LuCoins } from "react-icons/lu";

// Sidebar component.
export default function Sidebar() {
    const sidebarLinks: SidebarLinkProps[] = [
        {
            route: "dashboard",
            Icon: BiSolidDashboard,
        },
        {
            route: "members",
            Icon: BsFillPeopleFill,
        },
        {
            route: "books",
            Icon: ImBooks,
        },
        {
            route: "checkouts",
            Icon: IoNewspaperSharp,
        },
        {
            route: "fines",
            Icon: LuCoins,
        },
    ];

    return (
        <div className="pt-16 px-1.5 w-16 h-[calc(100vh-3.5rem)] flex flex-col gap-3 bg-background border-r border-muted fixed z-50">
            {sidebarLinks.map((link) => (
                <SidebarLink key={link.route} {...link} />
            ))}
        </div>
    );
}

// Link styler for sidebar links.
function SidebarLink({ route, Icon }: SidebarLinkProps) {
    const path = usePathname();

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {/* Styling the link based on the path and variant. */}
                    <Link
                        href={route}
                        className={`!text-2xl !px-3 ${buttonVariants({
                            size: "lg",
                            variant: !(path === `/${route}`)
                                ? "outline"
                                : "default",
                        })}`}
                    >
                        {<Icon />}
                    </Link>
                </TooltipTrigger>

                {/* Displaying a tooltip with the route name. */}
                <TooltipContent side="top">
                    <p className="capitalize">{route}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

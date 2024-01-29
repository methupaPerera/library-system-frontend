import type { Children } from "@/typings/prop-types";

import { Sidebar } from "@/components";

export default function AdminLayout({ children }: Children) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="pl-16 w-full bg-secondary p-1">{children}</div>
        </div>
    );
}

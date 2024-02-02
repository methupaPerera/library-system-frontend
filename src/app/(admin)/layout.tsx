import type { Children } from "@/typings/prop-types";

import { Sidebar } from "@/components";

export default function AdminLayout({ children }: Children) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="min-h-[calc(100vh-3.5rem)] pl-16 w-full bg-secondary">{children}</div>
        </div>
    );
}

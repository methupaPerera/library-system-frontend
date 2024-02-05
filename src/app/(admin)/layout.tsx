// Importing types.
import type { Children } from "@/typings/prop-types";

// Importing components.
import { Sidebar } from "@/components";

export default function AdminLayout({ children }: Children) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="pl-16 min-h-[calc(100vh-3.5rem)] w-full bg-secondary">
                {children}
            </div>
        </div>
    );
}

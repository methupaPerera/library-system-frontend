import Sidebar from "@/components/Sidebar";
import type { Children } from "@/typings";

export default function AdminLayout({ children }: Children) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-[100%] bg-secondary p-1">{children}</div>
        </div>
    );
}

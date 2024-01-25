import Sidebar from "@/components/Sidebar";
import type { Children } from "@/typings";

export default function AdminLayout({ children }: Children) {
    return (
        <div className="relative">
            <Sidebar />
            <div className="absolute left-48">{children}</div>
        </div>
    );
}

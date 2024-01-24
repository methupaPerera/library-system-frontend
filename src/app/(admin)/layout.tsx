import Sidebar from "@/components/Sidebar";
import { Children } from "@/typings";

export default function AdminLayout({ children }: Children) {
    return (
        <>
            <Sidebar />
            {children}
        </>
    );
}

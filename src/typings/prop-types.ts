import { Genres } from "./admin-types";

export type Children = Readonly<{ children: React.ReactNode }>;

type BaseReturns = {
    status: "success" | "failed";
    message: string;
};

// Types for the sidebar. -------------------------------------------

export type SidebarLinkProps = {
    route: string;
    Icon: React.ReactElement;
};

// Types for the dashboard components. ------------------------------

export type StaticsCardProps = {
    caption: string;
    value: string | number;
    Icon: React.ElementType;
};

export type BookDataProps = {
    title: string;
    author: string;
    stock: number;
    borrowed_count: number;
};

export type DashboardItems = BaseReturns & {
    data: {
        books_count: number;
        members_count: number;
        top_books: BookDataProps[];
        total_fines: number;
    };
};

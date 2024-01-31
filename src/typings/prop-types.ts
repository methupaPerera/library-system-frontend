export type Children = Readonly<{ children: React.ReactNode }>;

type BaseReturns = {
    status: "success" | "failed";
    message: string;
};

// Types for Sidebar component props.
export type SidebarLinkProps = {
    route: string;
    Icon: React.ReactElement;
};

// Types for Dashboard component props.
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

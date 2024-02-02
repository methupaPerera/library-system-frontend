export type Children = Readonly<{ children: React.ReactNode }>;

type BaseReturns = {
    status: "success" | "failed";
    message: string;
};

// Types for Sidebar component props.
export type SidebarLinkProps = {
    route: string;
    Icon: React.ElementType;
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

export type RecentCheckoutProps = {
    serial: string;
    book_id: string;
    member_id: string;
    return_date: string;
    status: "returned" | "borrowed";
};

export type DashboardItems = BaseReturns & {
    data: {
        books_count: number;
        members_count: number;
        total_fines: number;
        top_books: BookDataProps[];
        recent_checkouts: RecentCheckoutProps[];
    };
};

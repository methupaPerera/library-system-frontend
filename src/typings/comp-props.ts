export type SidebarLinkProps = {
    route: string;
    Icon: React.ElementType;
};

export type StaticsCardProps = {
    caption: string;
    value: string | number;
    Icon: React.ElementType;
};

export type TopBookDataProps = {
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

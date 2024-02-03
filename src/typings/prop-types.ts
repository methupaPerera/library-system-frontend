import type { Genres } from "./admin-types";

export type Children = Readonly<{ children: React.ReactNode }>;

type BaseReturns = {
    status: "success" | "failed";
    message: string;
};

// Types for Sidebar component props. -------------------------------
export type SidebarLinkProps = {
    route: string;
    Icon: React.ElementType;
};

// Types for Dashboard component props. -----------------------------
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

// Types for all the data tables. -----------------------------------

export type Headings = { heading: string; width: string };

export type Pagination = {
    currentPage: number;
    allPages: number;
};

// Types for Member props.
export type Member = {
    member_id: string;
    full_name: string;
    email: string;
    address: string;
    phone_number: string;
    membership_type: "member" | "admin";
    registration_date: string;
    expiry_date: string;
    fines: number;
};

// Types for Book props.
export type Book = {
    [index: string]: string | number;
    book_id: string;
    title: string;
    author: string;
    genre: Genres;
    stock: number;
    borrowed_count: number;
};

// Types for Checkout props.
export type Checkout = {
    serial: string;
    book_id: string;
    member_id: string;
    borrowed_date: string;
    return_date: string;
    status: "borrowed" | "returned";
};

export type BookTableProps = {
    data: Book[] | null;
    headingData: Headings[];
    isLoading: boolean;
    pagination: Pagination;
    setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
    fetchItems: (page: number, query: string) => Promise<void>;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

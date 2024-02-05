import type { Headings } from "./data-types";

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

export type DashboardItems = BaseReturns & {
    data: {
        books_count: number;
        members_count: number;
        total_fines: number;
        top_books: TopBookDataProps[];
        recent_checkouts: RecentCheckoutProps[];
    };
};

// Types for all the data tables and forms. -----------------------------------

export type FormProps = {
    isFormOpen: boolean;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TableBaseProps<T> = {
    data: T[] | null;
    headingData: Headings[];
    isLoading: boolean;
    pagination: Pagination;
    setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchItems: (page: number, query: string) => Promise<void>;
};

export type TableActionProps<T> = {
    rowData: T;
    refresh: () => void;
};

export type ControllerProps = {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchItems: (page: number, query: string) => void;
    refresh: () => void;
};

export type PaginationProps = {
    searchValue: string;
    currentPage: number;
    allPages: number;
    setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
    fetchItems: (page: number, query: string) => void;
};

// Types for Member props.
export type MembershipTypes = "admin" | "member";

export type Member = {
    [index: string]: string | number | {};
    member_id: string;
    full_name: string;
    email: string;
    address: string;
    phone_number: string;
    membership_type: MembershipTypes;
    registration_date: string;
    expiry_date: string;
    fines: number;
};

// Types for Book props.
export type Genres = "Sci-fi" | "Novel" | "Mystery" | "Action" | "Adventure";

export type Book = {
    [index: string]: string | number;
    isbn: string;
    book_id: string;
    title: string;
    author: string;
    genre: Genres;
    stock: number;
    borrowed_count: number;
    total_borrowings: number;
};

export type BookTableProps = TableBaseProps<Book>;

// Types for Checkout props.
export type Checkout = {
    [index: string]: string | number | {};
    serial: string;
    book_id: string;
    member_id: string;
    borrowed_date: string;
    return_date: string;
    status: "borrowed" | "returned";
};

export type Pagination = {
    currentPage: number;
    allPages: number;
};

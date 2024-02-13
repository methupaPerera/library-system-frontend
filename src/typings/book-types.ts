import { TableBaseProps } from "./table-props";

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

export type BookFormProps = {
    isFormOpen: boolean;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type BookFormInputs = {
    title: string;
    isbn: string;
    author: string;
    genre: Genres;
    stock: number;
};

export type UpdateBookFormInputs = {
    title: string;
    isbn: string;
    author: string;
    genre: Genres;
    to_add_stock: number;
    to_remove_stock: number;
};

export type BookTableProps = TableBaseProps<Book>;

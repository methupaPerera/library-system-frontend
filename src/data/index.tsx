import type { Genres } from "@/typings/book-types";
import type { Headings } from "@/typings/table-props";

export const genres: Genres[] = [
    "Sci-fi",
    "Novel",
    "Mystery",
    "Action",
    "Adventure",
];

export const memberHeadingData: Headings[] = [
    { heading: "Member ID", width: "w-[10%]" },
    { heading: "Full Name", width: "w-[30%]" },
    { heading: "Address", width: "w-[20%]" },
    { heading: "Phone", width: "w-[20%]" },
    { heading: "Membership Status", width: "w-[10%]" },
    { heading: "", width: "w-[10%]" },
];

export const bookHeadingData: Headings[] = [
    { heading: "Book ID", width: "w-[10%]" },
    { heading: "Title", width: "w-[30%]" },
    { heading: "Author", width: "w-[20%]" },
    { heading: "Genre", width: "w-[20%]" },
    { heading: "Remaining", width: "w-[10%]" },
    { heading: "", width: "w-[10%]" },
];

export const checkoutHeadingData: Headings[] = [
    { heading: "Serial", width: "w-[10%]" },
    { heading: "Member ID", width: "w-[15%]" },
    { heading: "Book ID", width: "w-[15%]" },
    { heading: "Borrowed Date", width: "w-[20%]" },
    { heading: "Return Date", width: "w-[20%]" },
    { heading: "Status", width: "w-[10%]" },
    { heading: "", width: "w-[10%]" },
];

import type { Genres } from "@/typings/book-types";
import type { Headings } from "@/typings/table-props";

export const genres: Genres[] = [
    "Sci-fi",
    "Novel",
    "Mystery",
    "Action",
    "Adventure",
];

export const headingData: Headings[] = [
    { heading: "Book ID", width: "w-[10%]" },
    { heading: "Title", width: "w-[30%]" },
    { heading: "Author", width: "w-[20%]" },
    { heading: "Genre", width: "w-[20%]" },
    { heading: "Remaining", width: "w-[10%]" },
    { heading: "", width: "w-[10%]" },
];

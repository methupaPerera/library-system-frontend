import type { Headings } from "@/typings/data-types";
import type { Genres } from "@/typings/prop-types";

// Book Genres for the book form. -----------------------------------
export const genres: Genres[] = [
    "Sci-fi",
    "Novel",
    "Mystery",
    "Action",
    "Adventure",
];

// Heading data for the book table. ---------------------------------
export const headingData: Headings[] = [
    { heading: "Book ID", width: "w-[10%]" },
    { heading: "Title", width: "w-[30%]" },
    { heading: "Author", width: "w-[20%]" },
    { heading: "Genre", width: "w-[20%]" },
    { heading: "Remaining", width: "w-[10%]" },
    { heading: "", width: "w-[10%]" },
];

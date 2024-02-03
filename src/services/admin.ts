import type {
    AdminProperties,
    CreateBookInputs,
    CreateBookReturns,
    CreateMemberInputs,
    CreateMemberReturns,
} from "@/typings/admin-types";

import { Utils } from "./utils";
import { toast } from "sonner";

class Admin extends Utils implements AdminProperties {
    // API endpoint URLs.
    private baseUrl: string | undefined;
    private memberUrl: string;
    private bookUrl: string;

    constructor(apiUrl: string | undefined) {
        super();

        this.baseUrl = apiUrl;
        this.memberUrl = `${apiUrl}/member`;
        this.bookUrl = `${apiUrl}/book`;
    }

    // Method to submit new member data and get the ID & password.
    async submitCreateMember(formData: CreateMemberInputs) {
        const tId = toast.loading("Please wait...");

        try {
            const res = await fetch(this.memberUrl, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    Authorization: `Bearer ${this.getAccessTokenCookie()}`,
                    "Content-Type": "application/json",
                },
            });

            const { status, message, data }: CreateMemberReturns =
                await res.json();

            toast.dismiss(tId);

            toast(message);

            // If the creation is successful, return the status and data.
            if (status === "success") {
                return { status, data };
            }
        } catch (e) {
            toast.dismiss(tId);
            toast("Failed to submit new member data.");
        }
    }

    // Method to submit new book data.
    async submitCreateBook(formData: CreateBookInputs) {
        const tId = toast.loading("Please wait...");

        try {
            const res = await fetch(this.bookUrl, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    Authorization: `Bearer ${this.getAccessTokenCookie()}`,
                    "Content-Type": "application/json",
                },
            });

            const { message }: CreateBookReturns = await res.json();

            toast.dismiss(tId);

            toast(message);
        } catch (e) {
            toast.dismiss(tId);
            toast("Failed to submit new book data.");
        }
    }

    // Method to delete a book.
    async deleteBook(book_id: string): Promise<void> {
        const tId = toast.loading("Please wait...");

        try {
            const res = await fetch(this.bookUrl, {
                method: "DELETE",
                body: JSON.stringify({ book_id: book_id }),
                headers: {
                    Authorization: `Bearer ${this.getAccessTokenCookie()}`,
                    "Content-Type": "application/json",
                },
            });

            const { message }: CreateBookReturns = await res.json();

            toast.dismiss(tId);

            toast(message);
        } catch (e) {
            toast.dismiss(tId);
            toast("Failed to delete the book.");
        }
    }

    // Method to fetch different data.
    async getData<T>(
        toFetch: "book" | "member" | "checkout",
        query: string = "",
        page: number = 1
    ): Promise<[T[], number] | null> {
        try {
            const res = await fetch(
                `${this.baseUrl}/${toFetch}?page=${page - 1}&title=${query}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${this.getAccessTokenCookie()}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const { data } = await res.json();

            const fetchedData = data[`${toFetch}s`];
            const fullCount = data[`${toFetch}s_count`];

            const pages = Math.ceil(fullCount / 10);

            return [fetchedData, pages];
        } catch (e) {
            toast("Failed to fetch book data.");

            return null;
        }
    }
}

const admin = Object.freeze(new Admin(process.env.NEXT_PUBLIC_API_URL));

export default admin;

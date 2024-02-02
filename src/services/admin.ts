import type {
    AdminProperties,
    CreateBookInputs,
    CreateBookReturns,
    CreateMemberInputs,
    CreateMemberReturns,
} from "@/typings/admin-types";
import type { Book } from "@/typings/prop-types";

import { Utils } from "./utils";
import { toast } from "sonner";

class Admin extends Utils implements AdminProperties {
    // API endpoint URLs.
    private createMemberUrl: string;
    private getBooksUrl: string;
    private createBookUrl: string;

    constructor(apiUrl: string | undefined) {
        super();

        this.createMemberUrl = `${apiUrl}/member`;
        this.getBooksUrl = `${apiUrl}/book`;
        this.createBookUrl = `${apiUrl}/book`;
    }

    // Method to submit new member data and get the ID & password.
    async submitCreateMember(formData: CreateMemberInputs) {
        const tId = toast.loading("Please wait...");

        try {
            const res = await fetch(this.createMemberUrl, {
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
            const res = await fetch(this.createBookUrl, {
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

    // Method to fetch book data.
    async getBooks(page: number): Promise<[Book[], number] | null> {
        try {
            const res = await fetch(`${this.getBooksUrl}?page=${page}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.getAccessTokenCookie()}`,
                    "Content-Type": "application/json",
                },
            });

            const {
                data: { books, books_count },
            }: { data: { books: Book[]; books_count: number } } =
                await res.json();

            const pages = Math.ceil(books_count / 10);

            return [books, pages];
        } catch (e) {
            toast("Failed to fetch book data.");
            return null;
        }
    }
}

const admin = Object.freeze(new Admin(process.env.NEXT_PUBLIC_API_URL));

export default admin;

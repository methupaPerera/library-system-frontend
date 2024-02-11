// import type {
//     AdminProperties,
//     BookFormInputs,
//     BookFormReturns,
//     CreateMemberInputs,
//     CreateMemberReturns,
//     UpdateBookFormInputs,
// } from "@/typings/admin-types";
// import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// import { Utils } from "./utils";
// import { toast } from "sonner";

// class Admin extends Utils implements AdminProperties {
//     // API endpoint URLs.
//     private baseUrl: string | undefined;
//     private memberUrl: string;
//     private bookUrl: string;

//     constructor(apiUrl: string | undefined, router: AppRouterInstance) {
//         super(router);

//         this.baseUrl = apiUrl;
//         this.memberUrl = `${apiUrl}/member`;
//         this.bookUrl = `${apiUrl}/book`;
//     }

//     // Method to submit new member data and get the ID & password. --
//     async submitCreateMember(formData: CreateMemberInputs) {
//         const fetchedData: CreateMemberReturns = await this.fetchResponse(
//             this.memberUrl,
//             "POST",
//             formData
//         );

//         const { status, message, data } = fetchedData;

//         toast(message);

//         // The status and data are returned if the operation is successful.
//         if (status === "success") {
//             return { status, data };
//         }
//     }

//     // Method to submit new book data. ------------------------------
//     async submitCreateBook(formData: BookFormInputs) {
//         const { message }: BookFormReturns = await this.fetchResponse(
//             this.bookUrl,
//             "POST",
//             formData
//         );

//         toast(message);
//     }

//     // Method to update a book. -------------------------------------
//     async submitUpdateBook(formData: UpdateBookFormInputs) {
//         const { message }: BookFormReturns = await this.fetchResponse(
//             this.bookUrl,
//             "PUT",
//             formData
//         );

//         toast(message);
//     }

//     // Method to delete a book. -------------------------------------
//     async deleteBook(book_id: string) {
//         const { message }: BookFormReturns = await this.fetchResponse(
//             this.bookUrl,
//             "DELETE",
//             { book_id: book_id }
//         );

//         toast(message);
//     }

//     // Method to fetch different data.
//     async getData<T>(
//         toFetch: "book" | "member" | "checkout",
//         query: string = "",
//         page: number = 1
//     ): Promise<[T[], number] | null> {
//         try {
//             const res = await fetch(
//                 `${this.baseUrl}/${toFetch}?page=${page - 1}&title=${query}`,
//                 {
//                     method: "GET",
//                     headers: {
//                         Authorization: `Bearer ${this.getAccessTokenCookie()}`,
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             if (res.status === 403) {
//                 const result = await this.refreshToken();
//                 if (!result) {
//                     return null;
//                 }
//                 const [fetchedData, pages]: any = await this.getData(
//                     toFetch,
//                     query,
//                     page
//                 );
//                 return [fetchedData, pages];
//             }

//             const { data } = await res.json();

//             const fetchedData = data[`${toFetch}s`];
//             const fullCount = data[`${toFetch}s_count`];

//             const pages = Math.ceil(fullCount / 10);

//             return [fetchedData, pages];
//         } catch (e) {
//             toast("Failed to fetch book data.");

//             return null;
//         }
//     }
// }

// export default Admin;

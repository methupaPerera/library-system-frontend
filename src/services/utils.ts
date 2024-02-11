// import { UtilsProperties } from "@/typings/admin-types";
// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { toast } from "sonner";

// export class Utils implements UtilsProperties {
//     router: AppRouterInstance;

//     constructor(router: AppRouterInstance) {
//         this.router = router;
//     }

//     // Common function for fetching data. ---------------------------
//     async fetchResponse(url: string, method: string, body?: any) {
//         const tId = toast.loading("Please wait...");

//         try {
//             const res = await fetch(url, {
//                 method: method,
//                 body: body && JSON.stringify(body),
//                 headers: {
//                     Authorization: `Bearer ${this.getAccessTokenCookie()}`,
//                     "Content-Type": "application/json",
//                 },
//             });

//             // This returns 403 status code if the access token is invalid or expired.
//             if (res.status === 403) {
//                 await this.refreshToken(); // Trying to refresh the token.

//                 // Performing the recent fetch request again.
//                 const data: any = await this.fetchResponse(url, method, body);
//                 return data;
//             }

//             const data = await res.json();

//             toast.dismiss(tId);

//             return data;
//         } catch (err) {
//             toast.dismiss(tId);
//             toast("An error occurred.");
//             return null;
//         }
//     }

//     async refreshToken() {
//         try {
//             const res = await fetch(
//                 `${process.env.NEXT_PUBLIC_API_URL}/refresh-token`,
//                 {
//                     method: "GET",
//                     headers: {
//                         "Refresh-Token": `Bearer ${this.getRefreshTokenCookie()}`,
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             // This returns 403 status code if the refresh token is invalid or expired.
//             if (res.status === 403) {
//                 toast("Authorization failed. Please log in again.");
//                 this.router.push("/login");
//                 return null;
//             }

//             const { data } = await res.json();

//             document.cookie = `access_token=${data.access_token};`;
//         } catch (err) {
//             toast("An error occurred.");
//         }
//     }

//     // Method to extract and return the access token from the cookies.
//     getAccessTokenCookie(): string | undefined {
//         const tokenCookie = document.cookie
//             // .split(";")
//             // .find((cookie) => cookie.trim().startsWith("access_token"))
//             // ?.split("=")[1];


//         return tokenCookie;
//     }

//     // Method to extract and return the refresh token from the cookies.
//     getRefreshTokenCookie(): string | undefined {
//         const tokenCookie = document.cookie
//             .split(";")
//             .find((cookie) => cookie.trim().startsWith("refresh_token"))
//             ?.split("=")[1];

//         return tokenCookie;
//     }

//     // Method to clear all the cookies.
//     clearCookies(): void {
//         const cookies = document.cookie.split(";");

//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i];
//             const eqPos = cookie.indexOf("=");
//             const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;

//             document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
//         }
//     }

//     // Method to format the dates coming from db, in 'yyyy/mm/dd' format.
//     formatDate(date: string): string {
//         const res = new Date(date);

//         const year = res.getFullYear();
//         const month = (res.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-indexed.
//         const day = res.getDate().toString().padStart(2, "0");

//         const formattedDate = `${year}/${month}/${day}`;

//         return formattedDate;
//     }
// }

// export default Utils;

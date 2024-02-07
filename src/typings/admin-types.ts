import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Genres, MembershipTypes } from "./prop-types";

type BaseReturns = {
    status: "success" | "failed";
    message: string;
};

// Types related to member creation functions. ----------------------
export type CreateMemberInputs = {
    full_name: string;
    address: string;
    phone_number: string;
    email: string;
    membership_type: MembershipTypes;
};

export type CreateMemberReturns = BaseReturns & {
    data: {
        member_id?: string;
        password?: string;
    };
};

export type NewMemberModalState = {
    state: boolean;
    info: { member_id: string; password: string };
};

// Types related to book creation functions. ------------------------
export type BookFormInputs = {
    title: string;
    isbn: string;
    author: string;
    genre: Genres;
    stock: number;
};

export type BookFormReturns = BaseReturns & {
    data: {};
};

// Types related to book updating functions. ------------------------
export type UpdateBookFormInputs = {
    book_id: string;
    isbn: string;
    title: string;
    author: string;
    genre: string;
    to_add_stock: number;
    to_remove_stock: number;
};

export type UpdateBookFormReturns = BaseReturns & {
    data: {};
};

// Interface for the Admin class specifying its properties. ---------
export interface AdminProperties {
    submitCreateMember(formData: CreateMemberInputs): Promise<
        | {
              status: "success";
              data: {
                  member_id?: string | undefined;
                  password?: string | undefined;
              };
          }
        | undefined
    >;
    submitCreateBook(formData: BookFormInputs): Promise<void>;
    submitUpdateBook(formData: UpdateBookFormInputs): Promise<void>;
    getData<T>(
        toFetch: "book" | "member" | "checkout",
        query: string,
        page: number
    ): Promise<[T[], number] | null>;
    deleteBook(book_id: string): Promise<void>;
}

// Interface for the Utils class specifying its properties. ---------
export interface UtilsProperties {
    router?: AppRouterInstance;
    fetchResponse: (url: string, method: string, body?: any) => any;
    refreshToken: () => null | any;
    getAccessTokenCookie: () => string | undefined;
    getRefreshTokenCookie: () => string | undefined;
    clearCookies: () => void;
    formatDate: (date: string) => string;
}

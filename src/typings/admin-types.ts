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
export type CreateBookInputs = {
    title: string;
    isbn: string;
    author: string;
    genre: Genres;
    stock: number;
};

export type CreateBookReturns = BaseReturns & {
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
    submitCreateBook(formData: CreateBookInputs): Promise<void>;
    getData<T>(
        toFetch: "book" | "member" | "checkout",
        query: string,
        page: number
    ): Promise<[T[], number] | null>;
}

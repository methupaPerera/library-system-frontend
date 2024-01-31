type BaseReturns = {
    status: "success" | "failed";
    message: string;
};

// Types for the member creation functions. -------------------------

export type MembershipTypes = "admin" | "member";

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

export type NewMemberState = {
    state: boolean;
    info: { member_id: string; password: string };
};

// Types for the book creation functions. -------------------------

export type Genres = "sci-fi" | "novel" | "mystery" | "action" | "adventure";

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

// Interface for the admin class. -----------------------------------

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
}
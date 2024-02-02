type BaseReturns = {
    status: "success" | "failed";
    message: string;
};

// Types related to member creation functions.
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

// Types related to book creation functions.
export type Genres = "Sci-fi" | "Novel" | "Mystery" | "Action" | "Adventure";

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

// Interface for the Admin class specifying its properties.
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
};

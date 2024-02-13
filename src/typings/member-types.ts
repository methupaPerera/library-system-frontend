export type MembershipTypes = "admin" | "member";

export type Member = {
    [index: string]: string | number | {};
    member_id: string;
    full_name: string;
    email: string;
    address: string;
    phone_number: string;
    membership_type: MembershipTypes;
    registration_date: string;
    expiry_date: string;
    fines: number;
};

export type CreateMemberInputs = {
    full_name: string;
    address: string;
    phone_number: string;
    email: string;
    membership_type: MembershipTypes;
};

export type NewMemberModalState = {
    state: boolean;
    info: { member_id: string; password: string };
};

export type UpdateBookFormInputs = {
    book_id: string;
    isbn: string;
    title: string;
    author: string;
    genre: string;
    to_add_stock: number;
    to_remove_stock: number;
};

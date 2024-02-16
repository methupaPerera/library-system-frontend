import { TableBaseProps } from "./table-props";

export type MembershipTypes = "admin" | "member";

export type Member = {
    [index: string]: string | number;
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

export type MemberFormProps = {
    isFormOpen: boolean;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditMemberFormProps = MemberFormProps & {
    memberData: Member;
    refresh: () => void;
};

export type MemberFormInputs = {
    full_name: string;
    address: string;
    phone_number: string;
    email: string;
    membership_type: MembershipTypes;
};

export type EditMemberFormInputs = {
    member_id: string;
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

export type MemberTableProps = TableBaseProps<Member>;

// Types for the member creation functions. -------------------------

export type CreateMemberInputs = {
    full_name: string;
    address: string;
    phone_number: string;
    email: string;
    membership_type: string;
};

type BaseReturns = {
    status: "success" | "failed";
    message: string;
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

export interface AdminProperties {
    submitCreateMember(formData: CreateMemberInputs): any;
}

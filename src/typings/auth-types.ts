export type LoginInputs = {
    member_id: string;
    password: string;
};

export type UpdatePasswordInputs = {
    old_password: string;
    new_password: string;
};

type BaseReturns = {
    status: "success" | "failed";
    message: string;
};

export type LoginReturns = BaseReturns & {
    data: {
        access_token?: string;
    };
};

export type UpdatePasswordReturns = BaseReturns & {
    data: {};
};

export interface AuthProperties {
    submitLogin(formData: LoginInputs): Promise<void>;
    submitUpdatePassword(formData: UpdatePasswordInputs): Promise<void>;
    handleLogout(): void;
}

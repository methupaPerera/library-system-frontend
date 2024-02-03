type BaseReturns = {
    status: "success" | "failed";
    message: string;
};

// Types for login functions. ---------------------------------------
export type LoginInputs = {
    member_id: string;
    password: string;
};

export type LoginReturns = BaseReturns & {
    data: {
        access_token?: string;
    };
};

// Types for password reset functions. ------------------------------
export type UpdatePasswordInputs = {
    old_password: string;
    new_password: string;
};

export type UpdatePasswordReturns = BaseReturns & {
    data: {};
};

// Interface for the Auth class specifying its properties. ----------
export interface AuthProperties {
    submitLogin(formData: LoginInputs): Promise<void>;
    submitUpdatePassword(formData: UpdatePasswordInputs): Promise<void>;
    handleLogout(): void;
}

type BaseReturns = {
    status: "success" | "failed";
    message: string;
};

// Types for login functions. ---------------------------------------
export type LoginFormInputs = {
    member_id: string;
    password: string;
};

export type LoginFormReturns = BaseReturns & {
    data: {
        access_token?: string;
    };
};

// Types for password reset functions. ------------------------------
export type PasswordFormInputs = {
    old_password: string;
    new_password: string;
};

export type PasswordFormReturns = BaseReturns & {
    data: {};
};

// Interface for the Auth class specifying its properties. ----------
export interface AuthProperties {
    submitLogin(formData: LoginFormInputs): Promise<void>;
    submitPassword(formData: PasswordFormInputs): Promise<void>;
    handleLogout(): void;
}

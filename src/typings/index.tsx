export type Children = Readonly<{ children: React.ReactNode }>;

// --------------------- AUTH ---------------------------------------------------

export type LoginInputs = { member_id: string; password: string };

export type UpdatePasswordInputs = {
    old_password: string;
    new_password: string;
};

interface APIResponse {
    status: "success" | "failed";
    message: string;
}

export interface LoginReturns extends APIResponse {
    data: {
        access_token?: string;
    };
}

export interface UpdatePasswordReturns extends APIResponse {
    data: {};
}

// --------------------- SIDEBAR ------------------------------------------------

export type SidebarLinkProps = {
    route: string;
    Icon: React.ReactElement;
};

// --------------------- DASHBOARD ITEMS ----------------------------------------

export type StaticsCardProps = {
    caption: string;
    value: string | number;
    Icon: React.ElementType;
};

export type BookDataProps = {
    name: string;
    author: string;
    availability: boolean;
};

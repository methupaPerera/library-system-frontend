export type Children = Readonly<{ children: React.ReactNode }>;

// --------------------- LOGIN PAGE ---------------------------------------------

export type LoginInputs = { member_id: string; password: string };

export type LoginReturns = {
    access_token: string;
    message: string;
    status: "success" | "failed";
};

// --------------------- SIDEBAR ------------------------------------------------

export type SidebarLinkProps = {
    route: string;
    Icon: React.ReactElement;
};

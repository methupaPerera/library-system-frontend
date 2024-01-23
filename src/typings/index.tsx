export type Children = Readonly<{ children: React.ReactNode }>;
export type LoginInputs = { member_id: string; password: string };
export type LoginReturns = {
    access_token: string;
    message: string;
    status: "success" | "failed";
};

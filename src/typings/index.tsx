import { NextRequest } from "next/server";

export type Children = Readonly<{
    children: React.ReactNode;
    request?: NextRequest;
}>;

export type LoginInputs = { member_id: string; password: string };

export type LoginReturns = {
    access_token: string;
    message: string;
    status: "success" | "failed";
};

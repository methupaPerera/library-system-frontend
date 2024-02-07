"use client";

// Importing types.
import type { Children } from "@/typings/prop-types";
import type { AuthProperties } from "@/typings/auth-types";
import type { AdminProperties, UtilsProperties } from "@/typings/admin-types";

// Importing utilities.
import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";

import Auth from "@/services/auth";
import Utils from "@/services/utils";
import Admin from "@/services/admin";

// Type for the context.
type ContextTypes = {
    admin: AdminProperties;
    auth: AuthProperties;
    utils: UtilsProperties;
};

const Context = createContext<ContextTypes | undefined>(undefined);

// Hook for comsuming the context.
export const useAppContext = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error(
            "useAppContext must be used within a MyContextProvider."
        );
    }

    return context;
};

export default function AppContext({ children }: Children) {
    const router = useRouter();

    const utils = new Utils(router);
    const auth = new Auth(process.env.NEXT_PUBLIC_API_URL, router);
    const admin = new Admin(process.env.NEXT_PUBLIC_API_URL, router);

    return (
        <Context.Provider value={{ auth, admin, utils }}>
            {children}
        </Context.Provider>
    );
}

"use client";

// Importing types.
import type { Children } from "@/typings/main-types";

// Importing utilities.
import { createContext, useContext, useState } from "react";
import { CookiesProvider } from "react-cookie";

const Context = createContext<any | undefined>(undefined);

// Hook for comsuming the context.
export const useAppContext = () => useContext(Context);

export default function AppContext({ children }: Children) {
    // Handles the nav bar.
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <CookiesProvider>
            <Context.Provider value={{ isLoggedIn, setLoggedIn }}>
                {children}
            </Context.Provider>
        </CookiesProvider>
    );
}

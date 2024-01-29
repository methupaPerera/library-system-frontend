"use client";

import type { ThemeProviderProps } from "next-themes/dist/types";

import { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const [isMounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        isMounted && (
            <NextThemesProvider {...props}>{children}</NextThemesProvider>
        )
    );
}

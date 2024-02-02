import type { Metadata } from "next";
import type { Children } from "@/typings/prop-types";

import { Inter } from "next/font/google";
import "./globals.css";

import { Navigation } from "@/components";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Library System Frontend.",
    description: "Frontend for Library Systems.",
};

export default function RootLayout({ children }: Children) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    disableTransitionOnChange
                >
                    <Navigation />
                    <main className="pt-14">{children}</main>
                    <Toaster position="top-right" />
                </ThemeProvider>
            </body>
        </html>
    );
}

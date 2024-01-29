import type { Metadata } from "next";

import type { Children } from "@/typings/prop-types";

import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { Navigation } from "@/components";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Library System Frontend",
    description: "Frontend for library systems",
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

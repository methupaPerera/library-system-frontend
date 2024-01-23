import type { Metadata } from "next";
import type { Children } from "@/typings";

import { ThemeProvider } from "@/components/themeProvider";
import { Inter } from "next/font/google";
import { Navigation } from "@/components";
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
                    <main>{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}

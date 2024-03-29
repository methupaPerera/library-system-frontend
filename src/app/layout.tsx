// Importing types.
import type { Metadata } from "next";
import type { Children } from "@/typings/main-types";

// Importing utilities.
import AppContext from "@/contexts/context";
import { Inter } from "next/font/google";
import "./globals.css";

// Importing components.
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components";

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
                    <AppContext>
                        <Navigation />
                        <main className="pt-14">{children}</main>
                        <Toaster position="top-right" />
                    </AppContext>
                </ThemeProvider>
            </body>
        </html>
    );
}

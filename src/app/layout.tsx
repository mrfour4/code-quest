import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Code Quest",
    description: "A coding challenge platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ConvexClientProvider>
                        <NuqsAdapter>{children}</NuqsAdapter>
                    </ConvexClientProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}

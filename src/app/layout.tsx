import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "@/providers/convex-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Provider as JotaiProvider } from "jotai";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { inter } from "@/lib/font";
import "@liveblocks/react-tiptap/styles.css";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-ui/styles/dark/attributes.css";
import "../styles/globals.css";
import "../styles/prosemirror.css";
import "../styles/text-editor.css";

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
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ConvexClientProvider>
                        <NuqsAdapter>
                            <JotaiProvider>{children}</JotaiProvider>
                        </NuqsAdapter>
                    </ConvexClientProvider>
                    <Toaster richColors />
                </ThemeProvider>
            </body>
        </html>
    );
}

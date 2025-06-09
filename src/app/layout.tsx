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
    metadataBase: new URL("https://code-quest-kappa.vercel.app"),
    title: {
        default: "CodeQuest - Interactive Coding Challenge Platform",
        template: "%s | CodeQuest",
    },
    description:
        "Master programming with CodeQuest - the ultimate interactive coding challenge platform featuring AI-powered problems, real-time collaboration, and personalized learning.",
    keywords: [
        "coding challenges",
        "programming practice",
        "interactive learning",
        "coding platform",
        "algorithm practice",
        "programming education",
    ],
    authors: [{ name: "CodeQuest Team" }],
    creator: "CodeQuest",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://code-quest-kappa.vercel.app",
        title: "CodeQuest - Interactive Coding Challenge Platform",
        description:
            "Master programming with AI-powered challenges and real-time collaboration.",
        siteName: "CodeQuest",
        images: [
            {
                url: "https://code-quest-kappa.vercel.app/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "CodeQuest - Interactive Coding Challenge Platform",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CodeQuest - Interactive Coding Challenge Platform",
        description:
            "Master programming with AI-powered challenges and real-time collaboration.",
        creator: "@codequest",
        images: [
            {
                url: "https://code-quest-kappa.vercel.app/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "CodeQuest - Interactive Coding Challenge Platform",
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="canonical"
                    href="https://code-quest-kappa.vercel.app"
                />
            </head>
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

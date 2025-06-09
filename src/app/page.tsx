import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DemoDialog } from "@/modules/dashboard/components/demo-dialog";
import { Logo } from "@/modules/dashboard/components/logo";
import { Navbar } from "@/modules/dashboard/components/navbar";
import { SignInBtn } from "@/modules/dashboard/components/sign-in-btn";
import {
    ArrowRight,
    BookOpen,
    CheckCircle,
    Code,
    Play,
    Sparkles,
    Trophy,
    Users,
    Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CodeQuest - Interactive Coding Challenge Platform | Learn Programming Through Practice",
    description:
        "Master programming with CodeQuest - the ultimate interactive coding challenge platform. AI-powered problems, real-time collaboration, and personalized learning for students and instructors.",
    keywords:
        "coding challenges, programming practice, interactive learning, coding platform, algorithm practice, programming education, coding contests, LeetCode alternative, HackerRank alternative",
    authors: [{ name: "CodeQuest Team" }],
    creator: "CodeQuest",
    publisher: "CodeQuest",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://code-quest-kappa.vercel.app"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "CodeQuest - Interactive Coding Challenge Platform",
        description:
            "Master programming with AI-powered challenges, real-time collaboration, and personalized learning paths.",
        url: "https://code-quest-kappa.vercel.app",
        siteName: "CodeQuest",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "CodeQuest - Interactive Coding Challenge Platform",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "CodeQuest - Interactive Coding Challenge Platform",
        description:
            "Master programming with AI-powered challenges and real-time collaboration.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "CodeQuest - Interactive Coding Challenge Platform",
            },
        ],
        creator: "@codequest",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CodeQuest",
    description:
        "Interactive coding challenge platform with AI-powered problem generation and real-time collaboration",
    url: "https://code-quest-kappa.vercel.app",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    creator: {
        "@type": "Organization",
        name: "CodeQuest Team",
    },
    featureList: [
        "AI-powered problem generation",
        "Real-time collaboration",
        "Interactive code editor",
        "Personalized learning paths",
        "Programming contests",
        "Multi-language support",
    ],
};

export default function HomePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="flex min-h-screen flex-col">
                <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
                    <div className="mx-auto flex h-14 max-w-6xl items-center px-4 md:px-8">
                        <div className="mr-4 hidden md:flex">
                            <Logo />
                        </div>
                        <Navbar />
                        <div className="flex flex-1 items-center justify-end space-x-2">
                            <SignInBtn />
                        </div>
                    </div>
                </header>

                <main>
                    <section className="space-y-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:py-32">
                        <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 px-4 text-center">
                            <div className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-3 py-1 text-sm text-white">
                                🚀 Now with AI-Powered Problem Generation
                            </div>
                            <h1 className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                                Master Programming Through{" "}
                                <span className="text-primary">
                                    Interactive Challenges
                                </span>
                            </h1>
                            <p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
                                CodeQuest is the ultimate interactive coding
                                challenge platform. Practice algorithms,
                                collaborate in real-time, and accelerate your
                                programming journey with AI-powered problems
                                tailored to your skill level.
                            </p>
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <Link href="/problems">
                                    <Button size="lg" className="h-11 px-8">
                                        Start Coding Now
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <DemoDialog
                                    size="lg"
                                    className="h-11 cursor-pointer px-8"
                                >
                                    <Play className="mr-2 h-4 w-4" />
                                    Watch Demo
                                </DemoDialog>
                            </div>
                        </div>
                    </section>

                    <section
                        id="features"
                        className="mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-8 md:py-12 lg:py-24"
                    >
                        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 px-4 text-center">
                            <h2 className="font-heading text-3xl leading-[1.1] font-bold sm:text-3xl md:text-6xl">
                                Why Choose CodeQuest?
                            </h2>
                            <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
                                Experience the next generation of coding
                                education with features designed for modern
                                learners and educators.
                            </p>
                        </div>
                        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                            <Card className="relative overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <Sparkles className="text-primary h-6 w-6" />
                                        <CardTitle>
                                            AI-Powered Problems
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Generate unlimited coding challenges
                                        tailored to your skill level with our
                                        advanced AI system.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card className="relative overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <Users className="text-primary h-6 w-6" />
                                        <CardTitle>
                                            Real-Time Collaboration
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Code together with peers, share
                                        solutions, and learn from each other in
                                        real-time collaborative sessions.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card className="relative overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <Zap className="text-primary h-6 w-6" />
                                        <CardTitle>
                                            Interactive Editor
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Code in a powerful, feature-rich editor
                                        with syntax highlighting,
                                        auto-completion, and instant feedback.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card className="relative overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <Trophy className="text-primary h-6 w-6" />
                                        <CardTitle>Coding Contests</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Participate in competitive programming
                                        contests and climb the leaderboards to
                                        showcase your skills.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card className="relative overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <BookOpen className="text-primary h-6 w-6" />
                                        <CardTitle>
                                            Personalized Learning
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Follow customized learning paths that
                                        adapt to your progress and focus on
                                        areas that need improvement.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card className="relative overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <Code className="text-primary h-6 w-6" />
                                        <CardTitle>
                                            Multi-Language Support
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Practice in Python, JavaScript, Java,
                                        C++, and more with comprehensive
                                        language support and libraries.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    <section className="space-y-6 px-4 py-8 md:px-8 md:py-12 lg:py-24">
                        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                            <h2 className="font-heading text-3xl leading-[1.1] font-bold sm:text-3xl md:text-6xl">
                                Perfect for Students & Instructors
                            </h2>
                            <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
                                Whether you&apos;re learning to code or teaching
                                programming, CodeQuest provides the tools you
                                need to succeed.
                            </p>
                        </div>
                        <div className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem]">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold">
                                    For Students
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>
                                            Practice with thousands of coding
                                            problems
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>
                                            Get instant feedback and hints
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>
                                            Track your progress and achievements
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>
                                            Prepare for technical interviews
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold">
                                    For Instructors
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5 text-blue-500" />
                                        <span>
                                            Create custom assignments and
                                            challenges
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5 text-blue-500" />
                                        <span>
                                            Monitor student progress in
                                            real-time
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5 text-blue-500" />
                                        <span>
                                            Organize coding competitions
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5 text-blue-500" />
                                        <span>
                                            Access detailed analytics and
                                            reports
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-8 md:py-12 lg:py-24">
                        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                            <h2 className="font-heading text-3xl leading-[1.1] font-bold sm:text-3xl md:text-6xl">
                                Ready to Start Your Coding Journey?
                            </h2>
                            <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
                                Join thousands of developers who are already
                                improving their programming skills with
                                CodeQuest.
                            </p>
                            <div className="space-x-4">
                                <Link href="/problems">
                                    <Button size="lg" className="h-11 px-8">
                                        Get Started for Free
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t py-6 md:py-0">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:h-24 md:flex-row md:px-8">
                        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                            <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
                                © 2024 CodeQuest. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

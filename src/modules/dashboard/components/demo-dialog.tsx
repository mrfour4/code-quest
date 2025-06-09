"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
    children: React.ReactNode;
    variant?: "default" | "outline" | "ghost";
    size?: "sm" | "lg" | "default";
    className?: string;
};

export const DemoDialog = ({
    children,
    variant = "outline",
    size = "lg",
    className,
}: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={variant} size={size} className={className}>
                    {children}
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 lg:max-w-3xl">
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle>Code Quest Tutorial Video</DialogTitle>
                        <DialogDescription>
                            Watch this short video to understand how Code Quest
                            works and how to get started with your first
                            problem.
                        </DialogDescription>
                    </DialogHeader>
                </VisuallyHidden>
                <div className="flex aspect-video items-center justify-center">
                    <iframe
                        src="https://www.youtube.com/embed/5bId3N7QZec?autoplay=1&rel=0"
                        title="CodeQuest Demo - How Programmers Overprepare for Job Interviews"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="h-full w-full rounded-lg border-0"
                    ></iframe>
                </div>
            </DialogContent>
        </Dialog>
    );
};

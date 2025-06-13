"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateDocument } from "../api/documents";

export const NewDocButton = () => {
    const { isPending, mutate } = useCreateDocument();
    const { userId } = useAuth();
    const router = useRouter();

    const onClick = () => {
        if (!userId || isPending) return;

        mutate(
            { title: "New document" },
            {
                onSuccess: (id) => {
                    router.push(`/document/${id}`);
                    toast.success("Document created");
                },
                onError: (error) => {
                    console.log("Error creating document:", error);
                    toast.error("Error creating document");
                },
            },
        );
    };

    return (
        <Hint message="New document">
            <Button
                onClick={onClick}
                disabled={isPending}
                variant="secondary"
                size="icon"
                className="bg-primary hover:bg-primary/90 text-primary-foreground dark:text-primary dark:bg-input/50 dark:hover:bg-input/70"
            >
                <Plus />
            </Button>
        </Hint>
    );
};

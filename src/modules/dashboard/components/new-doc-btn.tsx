"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateDocument } from "../api/documents";

export const NewDocButton = () => {
    const { isPending, mutate } = useCreateDocument();
    const { organization } = useOrganization();
    const { orgId, userId } = useAuth();
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
                    console.error("Error creating document:", error);
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
                className="bg-input/50 hover:bg-input/70"
            >
                <Plus />
            </Button>
        </Hint>
    );
};

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { DatabaseZap } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { codeAtom } from "../atom/code";
import { languagesAtom } from "../atom/language";
import { testCasesAtoms } from "../atom/testcase";

export const PublishButton = () => {
    const { documentId } = useParams<{ documentId: Id<"documents"> }>();
    const language = useAtomValue(languagesAtom);
    const code = useAtomValue(codeAtom);
    const testCases = useAtomValue(testCasesAtoms);

    const { mutate, isPending } = useMutation({
        mutationFn: useConvexMutation(api.solutions.publish),
    });

    const onClick = () => {
        mutate(
            {
                documentId,
                code,
                language,
                testCases,
            },
            {
                onError: (error) => {
                    console.error("Error publishing solution:", error);
                    toast.error(
                        "Failed to publish solution. Please try again.",
                    );
                },
                onSuccess: (data) => {
                    console.log("Solution published successfully:", data);
                    toast.success("Solution published successfully!");
                },
            },
        );
    };

    return (
        <Hint message="Publish">
            <Button
                size="icon"
                variant="ghost"
                className="dark:hover:bg-input/50 size-8 rounded-sm"
                onClick={onClick}
                disabled={isPending}
            >
                <DatabaseZap />
            </Button>
        </Hint>
    );
};

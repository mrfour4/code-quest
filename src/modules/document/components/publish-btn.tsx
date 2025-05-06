import { Button } from "@/components/ui/button";
import { useUpdateDocument } from "@/modules/dashboard/api/documents";
import { FileText, PencilLine } from "lucide-react";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "../../../../convex/documents";

type Props = {
    documentId: Id<"documents">;
    type: Document["type"];
};

export const PublishButton = ({ documentId, type }: Props) => {
    const { mutate, isPending } = useUpdateDocument();

    const onClick = () => {
        const newType = type === "draft" ? "published" : "draft";

        mutate(
            {
                id: documentId,
                type: newType,
            },
            {
                onError(error) {
                    console.error("Error updating document:", error);
                    toast.error("Failed to update document.");
                },
                onSuccess() {
                    window.location.reload();

                    toast.success(
                        newType === "draft"
                            ? "Document can be edited."
                            : "Document published.",
                    );
                },
            },
        );
    };

    if (type === "draft") {
        return (
            <Button onClick={onClick} disabled={isPending}>
                <FileText />
                Publish
            </Button>
        );
    }

    return (
        <Button onClick={onClick} disabled={isPending}>
            <PencilLine />
            Edit
        </Button>
    );
};

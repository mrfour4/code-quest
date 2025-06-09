import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateDocument } from "@/modules/dashboard/api/documents";
import { FileText, PencilLine } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "../../../../convex/documents";
import { FormPublishDocument } from "./form-publish";

type Props = {
    documentId: Id<"documents">;
    type: Document["type"];
};

export const PublishButton = ({ documentId, type }: Props) => {
    const { mutate, isPending } = useUpdateDocument();
    const [open, setOpen] = useState(false);

    const onClick = () => {
        mutate(
            {
                id: documentId,
                type: "draft",
            },
            {
                onError(error) {
                    console.error("Error updating document:", error);
                    toast.error("Failed to update document.");
                },
                onSuccess() {
                    // TODO: Refactor this when use ID token instead of Access token
                    window.location.reload();
                    toast.success("Document can edited now.");
                },
            },
        );
    };

    if (type === "published") {
        return (
            <Button onClick={onClick} disabled={isPending}>
                <PencilLine />
                <span className="hidden sm:block">Edit</span>
            </Button>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <FileText />
                    <span className="hidden sm:block">Publish</span>
                </Button>
            </DialogTrigger>
            <DialogContent onEscapeKeyDown={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Publish Document</DialogTitle>
                    <DialogDescription>
                        Configure your document settings before publishing.
                    </DialogDescription>
                </DialogHeader>

                <FormPublishDocument
                    documentId={documentId}
                    onClose={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
};

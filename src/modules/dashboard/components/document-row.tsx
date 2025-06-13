import { ConfirmDialog } from "@/components/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { PencilLine, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Document, Role } from "../../../../convex/documents";
import { useDeleteDocument } from "../api/documents";
import { DOCUMENT_ICON_MAP } from "../constants";

type Props = {
    doc: Document;
};

export const DocumentRow = ({ doc }: Props) => {
    const Icon = DOCUMENT_ICON_MAP[doc.type] || PencilLine;
    const { mutate, isPending } = useDeleteDocument();
    const [open, setOpen] = useState(false);

    const canRemove = doc.role === Role.Admin;

    const onRemove = () => {
        mutate(
            { id: doc._id },
            {
                onSuccess: () => {
                    toast.success("Document deleted successfully");
                    setOpen(false);
                },
                onError: (error) => {
                    console.log("Error deleting document:", error);
                    toast.error("Error deleting document");
                },
            },
        );
    };

    return (
        <>
            <Link
                className="flex h-20 w-full items-center p-4 px-0 lg:px-4"
                href={`/document/${doc._id}`}
            >
                <div className="flex w-full items-center gap-x-3">
                    <div className="flex h-12 w-10 items-center justify-center rounded-md border px-2 py-3">
                        <Icon className="text-primary size-5" />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <div className="flex items-center gap-x-1.5">
                            <p className="text-sm font-medium">{doc.title}</p>
                            <Badge
                                variant="secondary"
                                className="hidden text-xs capitalize md:block"
                            >
                                {doc.orgName}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground text-xs">
                            Edited {formatDistanceToNow(doc.updatedAt)}
                        </p>
                    </div>
                </div>
                {canRemove && (
                    <Button
                        size="icon"
                        variant="ghost"
                        className="ml-auto"
                        disabled={isPending}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpen(true);
                        }}
                    >
                        <Trash className="text-destructive" />
                    </Button>
                )}
            </Link>
            <ConfirmDialog
                open={open}
                onOpenChange={setOpen}
                disabled={isPending}
                onConfirm={onRemove}
                onCancel={() => setOpen(false)}
            />
        </>
    );
};

export const DocumentRowSkeleton = () => {
    return (
        <div className="flex h-20 w-full items-center border-b p-4 last:border-b-0">
            <div className="flex w-full items-center gap-x-3">
                <div className="flex h-12 w-10 items-center justify-center rounded-md border px-2 py-3">
                    <Skeleton className="size-5 rounded" />
                </div>
                <div className="flex flex-col gap-y-2">
                    <Skeleton className="h-4 w-32 rounded" />
                    <Skeleton className="h-3 w-24 rounded" />
                </div>
            </div>
        </div>
    );
};

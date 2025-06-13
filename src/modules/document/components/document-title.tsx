import { useUpdateDocument } from "@/modules/dashboard/api/documents";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";

type Props = {
    id: Id<"documents">;
    title: string;
    canEdit?: boolean;
};

export const DocumentTitle = ({ id, title, canEdit = false }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(title);

    const { mutate, isPending } = useUpdateDocument();

    const onSubmit = () => {
        mutate(
            { id, title: value },
            {
                onError(err) {
                    console.log("Error updating document title", err);
                    toast.error("Error updating document title");
                },
                onSettled() {
                    setIsEditing(false);
                },
            },
        );
    };

    if (isEditing) {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <input
                    className="w-full rounded border bg-transparent px-2 py-1 text-sm font-semibold text-white focus:border-blue-500 focus:outline-none"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                    onFocus={(e) => e.target.select()}
                    onBlur={onSubmit}
                    disabled={isPending}
                />
            </form>
        );
    }

    return (
        <div className="flex h-full items-center justify-center gap-x-2">
            <h1 className="truncate font-semibold capitalize">{title}</h1>
            {canEdit && (
                <SquarePen
                    className="text-muted-foreground size-4 shrink-0 cursor-pointer hover:text-white"
                    onClick={() => setIsEditing(true)}
                />
            )}
        </div>
    );
};

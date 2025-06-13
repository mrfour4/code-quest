import { useUpdateDocument } from "@/modules/dashboard/api/documents";
import { useParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Id } from "../../../../convex/_generated/dataModel";

export const useUpdateDocumentState = () => {
    const { documentId } = useParams<{ documentId: string }>();

    const { mutate } = useUpdateDocument();

    const onUpdateState = () => {
        if (!documentId) {
            console.log("Document ID is not available");
            return;
        }

        mutate({ id: documentId as Id<"documents"> });
    };

    return useDebouncedCallback(onUpdateState, 1000);
};

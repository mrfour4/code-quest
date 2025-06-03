import { useParams } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";

export const useDocumentId = () => {
    const { documentId } = useParams<{ documentId: string }>();
    return documentId as Id<"documents">;
};

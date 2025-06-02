import { useParams } from "next/navigation";

export const useDocumentId = () => {
    const { documentId } = useParams<{ documentId: string }>();
    return documentId;
};

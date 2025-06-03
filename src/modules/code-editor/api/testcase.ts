import { useDocumentId } from "@/modules/document/hooks/use-document-id";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useSaveTestCases = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.testCases.save),
    });
};

export const useGetTestCases = () => {
    const documentId = useDocumentId();
    return useQuery(convexQuery(api.testCases.get, { documentId }));
};

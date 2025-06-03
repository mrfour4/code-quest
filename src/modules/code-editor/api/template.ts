import { useDocumentId } from "@/modules/document/hooks/use-document-id";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { api } from "../../../../convex/_generated/api";
import { languagesAtom } from "../atom/language";

export const usePublishTemplate = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.templates.publish),
    });
};

export const useGetTemplate = () => {
    const documentId = useDocumentId();
    const language = useAtomValue(languagesAtom);

    return useQuery(
        convexQuery(api.templates.get, {
            documentId,
            language: language.value,
        }),
    );
};

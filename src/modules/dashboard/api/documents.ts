import { useFilters } from "@/hooks/use-filters";
import { useDocumentId } from "@/modules/document/hooks/use-document-id";
import { useAuth } from "@clerk/nextjs";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePaginatedQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { ITEM_PER_PAGE } from "../constants";

export const useCreateDocument = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.documents.create),
    });
};

export const useUpdateDocument = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.documents.update),
    });
};

export const useDeleteDocument = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.documents.remove),
    });
};

export const useGetDocument = (id: string) => {
    return useQuery(
        convexQuery(api.documents.get, { id: id as Id<"documents"> }),
    );
};

export const useGetCurrentDocument = () => {
    const documentId = useDocumentId();
    return useGetDocument(documentId);
};

export const useListDocuments = () => {
    const { orgId } = useAuth();
    const {
        filters: { search, type },
    } = useFilters();

    const { results, isLoading, loadMore, status } = usePaginatedQuery(
        api.documents.list,
        { orgId: orgId ?? undefined, search, type: type ?? undefined },
        { initialNumItems: ITEM_PER_PAGE },
    );

    useEffect(() => {
        if (isLoading) return;

        if (results.length < ITEM_PER_PAGE && status === "CanLoadMore") {
            loadMore(ITEM_PER_PAGE - results.length);
        }
    }, [isLoading, results.length, status, loadMore]);

    const sortedResults = results.sort((a, b) => b.updatedAt - a.updatedAt);

    return {
        results: sortedResults,
        isLoading,
        loadMore,
        status,
    };
};

export const useGetProblems = () => {
    return useQuery(convexQuery(api.documents.problems, {}));
};

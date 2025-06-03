import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useCreateCategory = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.categories.create),
    });
};

export const useListCategories = () => {
    return useQuery(convexQuery(api.categories.list, {}));
};

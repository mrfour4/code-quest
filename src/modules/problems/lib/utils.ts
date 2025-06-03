import { cache } from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Option } from "../types";

export const getCategoryOpts = cache(
    (categories: Doc<"categories">[]): Option[] => {
        return categories.map((category) => ({
            value: category._id,
            label: category.name,
        }));
    },
);

export const getTagOpts = cache((): Option[] => {
    return [
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" },
    ];
});

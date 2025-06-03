import { z } from "zod";

export const documentSchema = z.object({
    title: z.string().min(1, "Title is required"),
    type: z.enum(["draft", "published"]),
    categoryId: z.string().min(1, "Category is required"),
    tag: z.enum(["easy", "medium", "hard"]),
});

export type DocumentValues = z.infer<typeof documentSchema>;

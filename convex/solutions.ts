import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export type InputTestCase = {
    id: string;
    label: string;
    value: string;
};

export type TestCase = {
    id: string;
    inputs: InputTestCase[];
    expected: string;
};

export const get = query({
    args: {
        documentId: v.id("documents"),
    },
    handler: async (ctx, { documentId }) => {
        const document = await ctx.db.get(documentId);
        if (!document) {
            throw new ConvexError("Document not found");
        }

        const solutions = await ctx.db
            .query("solutions")
            .withIndex("by_documentId", (q) => q.eq("documentId", documentId))
            .unique();

        if (!solutions) {
            return;
        }

        const testCases = JSON.parse(solutions.testCases) as TestCase[];

        return {
            ...solutions,
            testCases,
        };
    },
});

export const publish = mutation({
    args: {
        documentId: v.id("documents"),
        code: v.string(),
        language: v.string(),
        testCases: v.array(
            v.object({
                id: v.string(),
                inputs: v.array(
                    v.object({
                        id: v.string(),
                        label: v.string(),
                        value: v.string(),
                    }),
                ),
                expected: v.string(),
            }),
        ),
    },
    handler: async (ctx, { documentId, code, language, testCases }) => {
        const document = await ctx.db.get(documentId);
        if (!document) {
            throw new ConvexError("Document not found");
        }

        const solutions = await ctx.db
            .query("solutions")
            .withIndex("by_documentId", (q) => q.eq("documentId", documentId))
            .unique();

        if (solutions) {
            await ctx.db.patch(solutions._id, {
                code,
                language,
                testCases: JSON.stringify(testCases),
            });
        } else {
            await ctx.db.insert("solutions", {
                documentId,
                code,
                language,
                testCases: JSON.stringify(testCases),
            });
        }
    },
});

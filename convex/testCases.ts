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

        const testcase = await ctx.db
            .query("testCases")
            .withIndex("by_documentId", (q) => q.eq("documentId", documentId))
            .unique();

        if (!testcase) {
            return [] as TestCase[];
        }

        return JSON.parse(testcase.value) as TestCase[];
    },
});

export const save = mutation({
    args: {
        documentId: v.id("documents"),
        value: v.array(
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
    handler: async (ctx, { documentId, value }) => {
        const document = await ctx.db.get(documentId);
        if (!document) {
            throw new ConvexError("Document not found");
        }

        const testcase = await ctx.db
            .query("testCases")
            .withIndex("by_documentId", (q) => q.eq("documentId", documentId))
            .unique();

        if (testcase) {
            await ctx.db.patch(testcase._id, {
                value: JSON.stringify(value),
            });
        } else {
            await ctx.db.insert("testCases", {
                documentId,
                value: JSON.stringify(value),
            });
        }
    },
});

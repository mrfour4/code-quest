import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
    args: {
        documentId: v.id("documents"),
        language: v.string(),
    },
    handler: async (ctx, { documentId, language }) => {
        const document = await ctx.db.get(documentId);

        if (!document) {
            throw new ConvexError("Document not found");
        }

        const template = await ctx.db
            .query("templates")
            .withIndex("by_documentId_language", (q) =>
                q.eq("documentId", documentId).eq("language", language),
            )
            .unique();

        if (template) {
            const isPublished = document.type === "published";

            return {
                ...template,
                isPublished,
                code: isPublished
                    ? template.body
                    : `${template.head}\n${template.body}\n${template.tail}`,
            };
        }
    },
});

export const publish = mutation({
    args: {
        documentId: v.id("documents"),
        language: v.string(),
        head: v.string(),
        body: v.string(),
        tail: v.string(),
    },
    handler: async (ctx, { documentId, language, ...rest }) => {
        const document = await ctx.db.get(documentId);
        if (!document) {
            throw new ConvexError("Document not found");
        }

        const existingTemplate = await ctx.db
            .query("templates")
            .withIndex("by_documentId_language", (q) =>
                q.eq("documentId", documentId).eq("language", language),
            )
            .unique();

        if (existingTemplate) {
            await ctx.db.patch(existingTemplate._id, {
                ...rest,
            });
        } else {
            await ctx.db.insert("templates", {
                documentId,
                language,
                ...rest,
            });
        }
    },
});

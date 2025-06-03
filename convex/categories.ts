import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("categories").collect();
    },
});

export const create = mutation({
    args: { name: v.string() },
    handler: async (ctx, { name }) => {
        const existingCategory = await ctx.db
            .query("categories")
            .withIndex("by_name", (q) => q.eq("name", name))
            .first();

        if (existingCategory) {
            throw new ConvexError(
                `Category with name "${name}" already exists.`,
            );
        }

        return await ctx.db.insert("categories", { name: name.trim() });
    },
});

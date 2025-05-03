import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        title: v.string(),
        orgId: v.string(),
        orgName: v.string(),
        authorId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("documents", {
            ...args,
            type: "draft",
            updatedAt: Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("documents"),
        title: v.string(),
        type: v.optional(v.union(v.literal("draft"), v.literal("published"))),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        return await ctx.db.patch(id, {
            ...data,
            updatedAt: Date.now(),
        });
    },
});

export const remove = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    },
});

export const get = query({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const list = query({
    args: {
        orgId: v.optional(v.string()),
        type: v.optional(v.union(v.literal("draft"), v.literal("published"))),
        search: v.optional(v.string()),
        paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, { orgId, search, type, paginationOpts }) => {
        const initQuery = ctx.db.query("documents");
        const searchQuery = search
            ? initQuery.withSearchIndex("search_title", (q) =>
                  q.search("title", search),
              )
            : initQuery;

        let results;

        if (orgId) {
            const filtersQuery = searchQuery.filter((q) =>
                q.eq(q.field("orgId"), orgId),
            );
            if (type) {
                results = await filtersQuery
                    .filter((q) => q.eq(q.field("type"), type))
                    .paginate(paginationOpts);
            } else {
                results = await filtersQuery.paginate(paginationOpts);
            }
        } else {
            if (type) {
                results = await searchQuery
                    .filter((q) => q.eq(q.field("type"), type))
                    .paginate(paginationOpts);
            } else {
                results = await searchQuery.paginate(paginationOpts);
            }
        }

        return {
            ...results,
            page: structuredClone(results.page).sort(
                (a, b) => b.updatedAt - a.updatedAt,
            ),
        };
    },
});

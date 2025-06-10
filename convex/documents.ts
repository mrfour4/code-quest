import { filter } from "convex-helpers/server/filter";
import { getAllOrThrow } from "convex-helpers/server/relationships";
import { paginationOptsValidator, UserIdentity } from "convex/server";
import { ConvexError, v } from "convex/values";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import { internalAction, mutation, query, QueryCtx } from "./_generated/server";

export enum Role {
    Admin = "org:admin",
    Member = "org:member",
}

export type Organizations = {
    [key: string]: Role | undefined;
};

export interface User extends UserIdentity {
    orgId: string;
    orgName: string;
}

export interface Document extends Doc<"documents"> {
    role: Role;
}

export const create = mutation({
    args: {
        title: v.string(),
    },
    handler: async (ctx, { title }) => {
        const user = await getCurrentUser(ctx);

        return await ctx.db.insert("documents", {
            title,
            authorId: user.subject,
            orgId: user.orgId,
            orgName: user.orgName,
            type: "draft",
            updatedAt: Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("documents"),
        title: v.optional(v.string()),
        type: v.optional(v.union(v.literal("draft"), v.literal("published"))),
        categoryId: v.optional(v.id("categories")),
        tag: v.optional(
            v.union(v.literal("easy"), v.literal("medium"), v.literal("hard")),
        ),
        content: v.optional(v.string()),
    },
    handler: async (ctx, { id, ...rest }) => {
        const document = await getAccessibleDocument(ctx, id);

        if (document.role !== Role.Admin) {
            throw new ConvexError(
                "User not authorized to update this document",
            );
        }

        return await ctx.db.patch(id, {
            ...rest,
            updatedAt: Date.now(),
        });
    },
});

export const remove = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, { id }) => {
        const document = await getAccessibleDocument(ctx, id);

        if (document.role !== Role.Admin) {
            throw new ConvexError(
                "User not authorized to delete this document",
            );
        }

        ctx.db.delete(id);
        ctx.scheduler.runAfter(0, internal.documents.deleteRoom, { id });
    },
});

export const deleteRoom = internalAction({
    args: { id: v.id("documents") },
    handler: async (_, { id }) => {
        const result = await fetch(
            `https://api.liveblocks.io/v2/rooms/${id.toString()}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY!}`,
                },
            },
        );

        if (!result.ok) {
            throw new ConvexError("Failed to delete Liveblocks room");
        }
    },
});

export const get = query({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const document = await getAccessibleDocument(ctx, args.id);
        return document;
    },
});

export const getPublished = query({
    args: { id: v.id("documents") },
    handler: async (ctx, { id }) => {
        const document = await ctx.db.get(id);

        if (!document) {
            throw new ConvexError("Document not found");
        }

        if (document.type !== "published") {
            throw new ConvexError("Document is not published");
        }

        return document;
    },
});

export const getMany = query({
    args: { documentIds: v.array(v.id("documents")) },
    handler: async (ctx, { documentIds }) => {
        const documents = await getAllOrThrow(ctx.db, documentIds);

        return documents.map((doc) => ({
            id: doc._id,
            name: doc.title,
        }));
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
        const user = await getCurrentUser(ctx);

        const preIndexQuery = ctx.db.query("documents");
        const baseQuery = search
            ? preIndexQuery.withSearchIndex("search_title", (q) =>
                  q.search("title", search),
              )
            : preIndexQuery;

        const filteredQuery = filter(baseQuery, (doc) => {
            if (orgId && doc.orgId !== orgId) {
                return false;
            }

            if (type && doc.type !== type) {
                return false;
            }

            return true;
        });

        const results = await filteredQuery.paginate(paginationOpts);

        return {
            ...results,
            page: results.page
                .map((doc) => {
                    const { authorId, orgId } = doc;

                    let role;

                    if (user.subject === authorId) {
                        role = Role.Admin;
                    } else {
                        role = user.orgs[orgId];
                    }

                    return role ? { ...doc, role } : null;
                })
                .filter((doc) => !!doc),
        };
    },
});

export const problems = query({
    args: {},
    handler: async (ctx) => {
        const [categories, documents] = await Promise.all([
            ctx.db.query("categories").collect(),
            ctx.db
                .query("documents")
                .withIndex("by_type", (q) => q.eq("type", "published"))
                .collect(),
        ]);

        const problems = documents.map((doc) => {
            const category = categories.find(
                (cat) => cat._id === doc.categoryId,
            );

            return {
                ...doc,
                category: category?._id,
            };
        });
        return problems;
    },
});

type stringOrNull = string | null;

export async function getCurrentUser(ctx: QueryCtx) {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
        throw new ConvexError("User not authenticated");
    }

    const orgId = (user.org_id as stringOrNull) ?? "self";
    const orgName = (user.org_name as stringOrNull) ?? "personal";
    const orgRole = (user.org_role as stringOrNull) ?? Role.Admin;
    const orgs = user.organizations as Organizations;

    return {
        ...user,
        orgId,
        orgName,
        orgRole,
        orgs,
    };
}

export async function getAccessibleDocument(
    ctx: QueryCtx,
    id: Id<"documents">,
) {
    const user = await getCurrentUser(ctx);
    const document = await ctx.db.get(id);
    if (!document) {
        throw new ConvexError("Document not found");
    }

    const { authorId, orgId } = document;

    if (user.subject === authorId) {
        return {
            ...document,
            role: Role.Admin,
        };
    }

    const role = await getRoleForOrg(ctx, orgId);

    if (!role) {
        throw new ConvexError("User not authorized to access this document");
    }

    return {
        ...document,
        role,
    };
}

export async function getRoleForOrg(ctx: QueryCtx, orgId: string) {
    const user = await getCurrentUser(ctx);

    const role = user.orgs[orgId];

    return role ?? null;
}

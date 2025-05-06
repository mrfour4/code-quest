import { paginationOptsValidator, UserIdentity } from "convex/server";
import { ConvexError, v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query, QueryCtx } from "./_generated/server";

import { filter } from "convex-helpers/server/filter";

export enum Role {
    Admin = "org:admin",
    Member = "org:member",
}
export interface User extends UserIdentity {
    orgId: string;
    orgName: string;
}

export type Organizations = {
    [key: string]: Role | undefined;
};

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
    },
    handler: async (ctx, { id, title, type }) => {
        const document = await getAccessibleDocument(ctx, id);

        if (document.role !== Role.Admin) {
            throw new ConvexError(
                "User not authorized to update this document",
            );
        }

        return await ctx.db.patch(id, {
            title: title ?? document.title,
            type: type ?? document.type,
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

        return await ctx.db.delete(document._id);
    },
});

export const get = query({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const document = await getAccessibleDocument(ctx, args.id);
        return document;
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
                .filter((doc) => {
                    const { authorId, orgId } = doc;

                    if (user.subject === authorId) {
                        return true;
                    }

                    const role = user.orgs[orgId];
                    return !!role;
                })
                .sort((a, b) => b.updatedAt - a.updatedAt),
        };
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

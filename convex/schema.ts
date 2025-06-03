import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    categories: defineTable({
        name: v.string(),
    }).index("by_name", ["name"]),

    documents: defineTable({
        title: v.string(),
        orgId: v.string(),
        orgName: v.string(),
        authorId: v.string(),
        type: v.union(v.literal("draft"), v.literal("published")),
        categoryId: v.optional(v.id("categories")),
        tag: v.optional(
            v.union(v.literal("easy"), v.literal("medium"), v.literal("hard")),
        ),
        updatedAt: v.number(),
    })
        .index("by_orgId", ["orgId"])
        .index("by_type", ["type"])
        .index("by_category_id", ["categoryId"])
        .index("by_orgId_type", ["orgId", "type"])
        .searchIndex("search_title", {
            searchField: "title",
            filterFields: ["orgId", "type"],
        })
        .index("by_orgId_categoryId", ["orgId", "categoryId"]),

    testCases: defineTable({
        documentId: v.id("documents"),
        value: v.string(),
    }).index("by_documentId", ["documentId"]),

    templates: defineTable({
        documentId: v.id("documents"),
        language: v.string(),
        head: v.string(),
        body: v.string(),
        tail: v.string(),
    })
        .index("by_documentId", ["documentId"])
        .index("by_language", ["language"])
        .index("by_documentId_language", ["documentId", "language"]),
});

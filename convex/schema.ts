import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        orgId: v.string(),
        orgName: v.string(),
        authorId: v.string(),
        type: v.union(v.literal("draft"), v.literal("published")),
        updatedAt: v.number(),
    })
        .index("by_orgId", ["orgId"])
        .index("by_type", ["type"])
        .index("by_orgId_type", ["orgId", "type"])
        .searchIndex("search_title", {
            searchField: "title",
            filterFields: ["orgId", "type"],
        }),
    solutions: defineTable({
        documentId: v.id("documents"),
        language: v.string(),
        code: v.string(),
        testCases: v.string(),
    }).index("by_documentId", ["documentId"]),
});

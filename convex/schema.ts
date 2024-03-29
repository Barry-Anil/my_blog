import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blogs: defineTable({
    bgImage: v.any(),
    comments: v.array(
      v.object({
        createdAt: v.float64(),
        name: v.string(),
        profileUrl: v.string(),
        text: v.string(),
        userId: v.string(),
      })
    ),
    likeIds: v.array(v.string()),
    likes: v.float64(),
    name: v.optional(v.string()),
    profileImage: v.optional(v.string()),
    title: v.string(),
    content: v.string(),
    userId: v.string(),
  }),
  users: defineTable({
    credits: v.float64(),
    email: v.string(),
    endsOn: v.optional(v.float64()),
    subscriptionId: v.optional(v.string()),
    userId: v.string(),
  }).index("by_userId", ["userId"]),
});
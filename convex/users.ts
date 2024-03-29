import { v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation, mutation, query } from "./_generated/server";
import { getUserId } from "./util";


const FREE_CREDITS = 5;

export const getUser = query({
    args: {},
    handler: async (ctx, args) => {
      const userId = await getUserId(ctx);
  
      if (!userId) {
        return undefined;
      }
  
      return getFullUser(ctx, userId);
    },
  });

  export const createUser = internalMutation({
    args: {
        email: v.string(),
        userId: v.string(),
    },
    handler: async(ctx, args) => {
        await ctx.db.insert("users", {
            email: args.email,
            userId: args.userId,
            credits: FREE_CREDITS,
        });
    },
});


export function getFullUser(ctx: QueryCtx | MutationCtx, userId: string) {
    return ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
  }
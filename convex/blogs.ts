
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getUserId } from "./util";
import { getFullUser } from "./users";

export const createBlogpost = mutation({
  args: {
    title: v.string(),
    bgImage: v.any(),
    profileImage: v.optional(v.string()),
    content: v.string()
  },
  handler: async (ctx, args) => {
    
    const userId = await getUserId(ctx);

    console.log(userId)

    if (!userId) {
        throw new Error("you must be logged in to create a blog");
    }

    // const user =    await getFullUser(ctx, userId);
    // console.log(user)
    // if (!user) {
    //     throw new Error("no user with that id found");
    // }
  

    return await ctx.db.insert("blogs", {
        title: args.title,
        userId,
        bgImage: args.bgImage,
        content: args.content,
        likes: 0,
        likeIds: [],
        profileImage: args.profileImage,
        comments: [],

    });
  },
});
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args: {
        userId: v.string(),
        email: v.string(),
        createdAt: v.number(),
        name: v.string(),
        profileImage: v.string(),

    },
    handler: async (ctx, args) => {
        try {
            const newUser = await ctx.db.insert("users", {
                userId: args.userId,
                email: args.email,
                createdAt: args.createdAt,
                name: args?.name,
                profileImage: args?.profileImage,
            });
            return newUser;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to create user");
        }

    },
});

export const readUser = query({
    args: {
        userId: v.string()
    },
    handler: async (ctx, args) => {
        try {
            const userInfo = ctx.db.query("users").filter((user) => user.eq(user.field("userId"), args.userId)).first();
            return userInfo;
        } catch (error) {
            console.log(error);
            throw new Error("Error occuring while reading user data")
            
        }
    }
})

export const updateUser = mutation({
    args:{
        userId:v.string(),
        name:v.string()
    },
    handler:async (ctx, args) => {
        const userInfo = await ctx.db.query("users").filter((user) => user.eq(user.field("userId"), args.userId)).first();
        if(!userInfo){
            throw new Error("User not found");
        }
        const updateUser = await ctx.db.patch(userInfo._id!,{
        name:args.name
        });
        return updateUser
    }
})
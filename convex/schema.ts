import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    carts: defineTable({
      productId: v.number(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.string(),
    }).index("by_productId", ["productId"]),

    users: defineTable({
      clerkId: v.string(),
      email: v.string(),
      name: v.string(),
      imageUrl: v.string(),
    }),    
});


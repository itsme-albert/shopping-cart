import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addToCart = mutation({
    args: {
        productId: v.number(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      },
      handler: async (ctx, args) => {
        await ctx.db.insert("carts", {
            productId: args.productId,
            name: args.name,
            price: args.price,
            quantity: args.quantity,
            image: args.image,
        });
      },
});

export const fetchCart = query({
    handler: async (ctx) => {
      const cartItems = await ctx.db.query("carts").collect();
      return cartItems;
    },
});

export const removeItem = mutation({
    args: {
        productId: v.number(), 
      },
      handler: async (ctx, args) => {
        const cartItem = await ctx.db
        .query("carts")
        .withIndex("by_productId", (q) => q.eq("productId", args.productId))
        .first();
        if (!cartItem) throw new Error("Cart item not found");
        
        await ctx.db.delete(cartItem._id);
      },
})

export const deleteAllInCart = mutation({
    handler: async (ctx) => {
        const allCartItems = await ctx.db.query("carts").collect();
        
        for (const item of allCartItems) {
          await ctx.db.delete(item._id);
        }
    },
})

export const updateCartQuantity = mutation({
    args: {
      productId: v.number(),
      quantity: v.number(),
    },
    handler: async (ctx, args) => {
      const cartItem = await ctx.db
        .query("carts")
        .withIndex("by_productId", (q) => q.eq("productId", args.productId))
        .first();
  
      if (!cartItem) throw new Error("Cart item not found");
  
      await ctx.db.patch(cartItem._id, {
        quantity: args.quantity,
      });
    },
  });
  
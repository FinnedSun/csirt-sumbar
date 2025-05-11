import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const protalRouter = createTRPCRouter({
  getByTitle: baseProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input, ctx }) => {
      const result = await ctx.db.find({
        collection: "protal",
        where: {
          title: { equals: input.title }
        },
        limit: 1
      });

      const doc = result.docs[0];
      if (!doc) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Data tidak ditemukan"
        });
      }
      return {
        ...doc
      }
    }),
});
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

  getEvents: baseProcedure
    .query(async ({ ctx }) => {
      const today = new Date().toISOString().slice(0, 10); // format: YYYY-MM-DD
      const result = await ctx.db.find({
        collection: "event",
        where: {
          tanggalAkhir: { greater_than_equal: today }
        },
        sort: "tanggalAwal",
      });

      return result?.docs || [];
    }),
  createContact: baseProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
      subject: z.string(),
      message: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.db.create({
        collection: "contact",
        data: {
          ...input,
          createdAt: new Date().toISOString(),
        }
      });
      return result;
    }),
});
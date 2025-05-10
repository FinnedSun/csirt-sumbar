

import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { z } from 'zod'
import payload from 'payload'
import { TRPCError } from "@trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { Media } from "@/payload-types";

export const newsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await ctx.db.find({
        collection: 'news',
        limit: input.limit,
        page: input.cursor,
        where: {
          status: {
            equals: 'published'
          }
        }
      })

      if (!result) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'News not found',
        })
      }

      return {
        ...result,
        docs: result.docs.map((doc) => ({
          ...doc,
          slug: doc.slug,
          image: doc.image as Media | null,
        }))
      }
    }),
  getOnePublik: baseProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const result = await ctx.db.find({
        collection: 'news',
        where: {
          slug: { equals: input.slug },
          status: { equals: 'published' }
        },
        limit: 1
      });

      const doc = result.docs[0];
      if (!doc) throw new TRPCError({ code: 'NOT_FOUND' });

      return { ...doc, image: doc.image as Media | null };
    }),

  getOneDraft: protectedProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const result = await ctx.db.find({
        collection: 'news',
        where: { slug: { equals: input.slug } },
        depth: 2,
        limit: 1
      });

      const doc = result.docs[0];
      if (!doc) throw new TRPCError({ code: 'NOT_FOUND' });

      const isAuthor = ctx.session.user?.name === doc.author;

      if (!isAuthor) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You are not authorized to view this news' });
      }

      return { ...doc, image: doc.image as Media | null };
    }),
})
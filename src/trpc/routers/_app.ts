import { newsRouter } from '@/module/berita/server/procedures';
import { createTRPCRouter } from '../init';
import { protalRouter } from '@/module/protal/server/procedures';

export const appRouter = createTRPCRouter({
  berita: newsRouter,
  protal: protalRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

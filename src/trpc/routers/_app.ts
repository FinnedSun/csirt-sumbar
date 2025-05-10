import { newsRouter } from '@/module/berita/server/procedures';
import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  berita: newsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;

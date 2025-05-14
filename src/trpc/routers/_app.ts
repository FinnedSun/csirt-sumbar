import { newsRouter } from '@/module/berita/server/procedures';
import { createTRPCRouter } from '../init';
import { protalRouter } from '@/module/protal/server/procedures';
import { authRouter } from '@/module/auth/server/procedures';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  berita: newsRouter,
  protal: protalRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

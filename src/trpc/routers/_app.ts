import { newsRouter } from '@/module/berita/server/procedures';
import { createTRPCRouter } from '../init';

import { authRouter } from '@/module/auth/server/procedures';
import { portalRouter } from '@/module/protal/server/procedures';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  berita: newsRouter,
  portal: portalRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

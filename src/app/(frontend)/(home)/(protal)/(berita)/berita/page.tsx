import { ErrorPage } from '@/components/error-page';
import { LoadingPage } from '@/components/loading-page';
import { DEFAULT_LIMIT } from '@/constants';
import { BeritaView } from '@/module/berita/views/berita-view';
import { getQueryClient, HydrateClient, trpc } from '@/trpc/server'
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const dynamic = "force-dynamic"; // defaults to force-static

const BeritaPage = () => {

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.berita.getMany.queryOptions({
    limit: DEFAULT_LIMIT,
  }));

  return (
    <HydrateClient>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary fallback={<ErrorPage />}>
          <BeritaView />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  )
}

export default BeritaPage
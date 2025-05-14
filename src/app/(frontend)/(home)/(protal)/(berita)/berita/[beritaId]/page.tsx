import { ErrorPage } from "@/components/error-page";
import { LoadingPage } from "@/components/loading-page";
import BeritaSlugViwe from "@/module/berita/views/berita-slug-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{
    beritaId: string
  }>
}

const BeritaSlug = async ({ params }: Props) => {
  const { beritaId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.berita.getOnePublik.queryOptions(
    {
      slug: beritaId,
    }
  ))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary fallback={<ErrorPage />}>
          <BeritaSlugViwe beritaId={beritaId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default BeritaSlug
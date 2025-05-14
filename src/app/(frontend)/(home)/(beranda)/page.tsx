import { ErrorPage } from "@/components/error-page";
import { LoadingPage } from "@/components/loading-page";
import { BerandaView } from "@/module/beranda/views/beranda-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const dynamic = "force-dynamic"; // defaults to force-static

export default async function Home() {

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.berita.getCarousel.queryOptions({
      limit: 3,
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary fallback={<ErrorPage />}>
          <BerandaView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

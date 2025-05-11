import { BerandaView } from "@/module/beranda/views/beranda-view";
// import { trpc } from "@/trpc/server";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
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
    <HydrateClient>
      <Suspense fallback={"Loading.."}>
        <ErrorBoundary fallback={"Error.."}>
          <BerandaView />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  )
}

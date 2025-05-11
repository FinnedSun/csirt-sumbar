import BeritaSlugViwe from "@/module/berita/views/berita-slug-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: {
    beritaId: string
  }
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
      <Suspense fallback={<p>Memuat...</p>}>
        <BeritaSlugViwe beritaId={beritaId} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default BeritaSlug
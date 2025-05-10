import { PreviewView } from "@/module/berita/views/preview-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: { slug: string };
}

export default async function Page({ params }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    trpc.berita.getOneDraft.queryOptions({
      slug: params.slug
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Memuat preview...</div>}>
        <PreviewView beritaId={params.slug} />
      </Suspense>
    </HydrationBoundary>
  );
}
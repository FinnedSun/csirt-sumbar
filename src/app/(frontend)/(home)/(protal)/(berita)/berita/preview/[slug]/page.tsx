import { PreviewView } from "@/module/berita/views/preview-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    slug: string
  }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    trpc.berita.getOneDraft.queryOptions({
      slug
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Memuat preview...</div>}>
        <PreviewView beritaId={slug} />
      </Suspense>
    </HydrationBoundary>
  );
}
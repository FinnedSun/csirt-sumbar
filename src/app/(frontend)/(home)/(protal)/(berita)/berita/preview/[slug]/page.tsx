import { PreviewView } from "@/module/berita/views/preview-view";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { LoadingPage } from "@/components/loading-page";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "@/components/error-page";

interface Props {
  params: Promise<{
    slug: string
  }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  // Require authentication
  const session = await caller.auth.session();
  if (!session.user) {
    redirect("/admin"); // or show a message
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    trpc.berita.getOneDraft.queryOptions({
      slug
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary fallback={<ErrorPage />}>
          <PreviewView beritaId={slug} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary >
  );
}
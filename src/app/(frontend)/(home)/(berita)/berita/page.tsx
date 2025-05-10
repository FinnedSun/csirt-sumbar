import { DEFAULT_LIMIT } from '@/constants';
import { BeritaView } from '@/module/berita/views/berita-view';
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react'

const BeritaPage = () => {

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.berita.getMany.queryOptions({
    limit: DEFAULT_LIMIT,
  }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BeritaView />
    </HydrationBoundary>
  )
}

export default BeritaPage
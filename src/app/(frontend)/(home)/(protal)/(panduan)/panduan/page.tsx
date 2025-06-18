import PanduanView from '@/module/protal/views/panduan-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react'

const PanduanPage = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.portal.getPanduan.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PanduanView />
    </HydrationBoundary>
  )
}

export default PanduanPage
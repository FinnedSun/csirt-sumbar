import LayananView from '@/module/protal/views/layanan-view'
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react'

export const dynamic = 'force-dynamic'

const ProfilePage = () => {

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.portal.getByTitle.queryOptions({
    title: "Asisten"
  }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayananView />
    </HydrationBoundary>
  )
}

export default ProfilePage
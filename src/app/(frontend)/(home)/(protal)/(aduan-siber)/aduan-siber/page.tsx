
import AduanView from '@/module/protal/views/aduan';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react'

const ProfilePage = () => {

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.protal.getByTitle.queryOptions({
    title: "Aduan Siber"
  }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AduanView />
    </HydrationBoundary>
  )
}

export default ProfilePage
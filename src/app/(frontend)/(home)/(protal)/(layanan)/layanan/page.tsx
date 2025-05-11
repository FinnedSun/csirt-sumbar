import LayananView from '@/module/protal/views/layanan-view'
import { getQueryClient, HydrateClient, trpc } from '@/trpc/server';
import React from 'react'

const ProfilePage = () => {

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.protal.getByTitle.queryOptions({
    title: "Layanan"
  }));

  return (
    <HydrateClient>
      <LayananView />
    </HydrateClient>
  )
}

export default ProfilePage
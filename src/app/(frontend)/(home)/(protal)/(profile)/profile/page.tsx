
import ProfileView from '@/module/protal/views/profile-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react'

const ProfilePage = () => {

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.portal.getByTitle.queryOptions({
    title: "Profile"
  }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileView />
    </HydrationBoundary>
  )
}

export default ProfilePage

import EventView from '@/module/protal/views/event-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React from 'react'

const EventPage = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.portal.getEvents.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventView />
    </HydrationBoundary>
  )
}

export default EventPage 
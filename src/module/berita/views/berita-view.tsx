"use client"

import { DEFAULT_LIMIT } from '@/constants';
import { useTRPC } from '@/trpc/client'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import React from 'react'
import { BeritaList } from '../ui/components/berita-list';

export const BeritaView = () => {


  return (
    <div>
      <BeritaList />
    </div>
  )
}

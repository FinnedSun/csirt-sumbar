'use client'

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export const ErrorPage = () => {
  const router = useRouter()

  return (
    <div className='border border-red-800 border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-red-50 w-full rounded-lg'>
      <p className="text-red-800">Failed to load </p>
      <Button
        onClick={() => router.push('/')}
        variant="outline"
        className="mt-2"
      >
        Retry
      </Button>
    </div >
  )
}

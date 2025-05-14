import React from 'react'

export const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      <span className="ml-4 text-lg font-medium">Memuat data berita...</span>
    </div>
  )
}

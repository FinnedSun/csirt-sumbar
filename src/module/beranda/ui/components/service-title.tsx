import { Button } from '@/components/ui/button'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export const ServiceTitle = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mx-1">
      {/* Image Section - Hidden on mobile */}
      <div className="hidden lg:block relative w-full aspect-video">
        <Image
          src={"/service-image.jpg"}
          alt="image"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center lg:items-start p-4">
        <h1 className="text-4xl font-bold text-center lg:text-left mb-4">
          JabarProv CSIRT
        </h1>
        <p className="text-lg text-center lg:text-left mb-6">
          Jabarprov csirt adalah penyedia layanan tim respon insiden keamanan siber.
          Guna kemudahan dalam penanganan siber, silahkan laporkan pada link dibawah ini.
        </p>
        <Button asChild className="w-fit" variant={"outline"}>
          <Link href={"/lapor"}>Lihat Semua</Link>
        </Button>
      </div>
    </div>
  )
}

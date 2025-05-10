'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'


interface Props {
  carouselImages: {
    src: string
    alt: string
  }[];
  autoplay?: number;
}

export const CarouselBeranda = ({
  carouselImages,
  autoplay = 2000,
}: Props) => {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: autoplay,
        }),
      ]}
    >
      <CarouselContent>
        {carouselImages.map((carouselImage) => (
          <CarouselItem key={carouselImage.alt}>
            <div className="p-1 bg-transparent">
              <div>
                <div className="flex h-40 lg:h-100 w-full items-center justify-center">
                  <Image
                    src={carouselImage.src}
                    alt={carouselImage.alt}
                    width={1920}
                    height={1080}
                    className='w-full h-full object-cover rounded-lg'
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

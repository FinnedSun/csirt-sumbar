'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { useTRPC } from '@/trpc/client';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'


interface Props {
  autoplay?: number;
}

export const CarouselBeranda = ({
  autoplay = 2000,
}: Props) => {

  const trpc = useTRPC()

  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    error
  } = useSuspenseInfiniteQuery(trpc.berita.getCarousel.infiniteQueryOptions({
    limit: 3,
  },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
      }
    }
  ))

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
        {data.pages.flatMap((page) => page.docs.map((carouselImage) => (
          <CarouselItem
            key={carouselImage.id}
          >
            <div className="p-1 bg-transparent">
              <div>
                <div className="flex h-40 lg:h-100 w-full items-center justify-center">
                  <Image
                    src={
                      carouselImage.image?.url ||
                      '/test1.png'
                    }
                    alt={
                      carouselImage.image?.alt ||
                      'Gambar'
                    }
                    width={1920}
                    height={1080}
                    className='w-full h-full object-cover rounded-lg'
                  />
                </div>
              </div>
            </div>
          </CarouselItem>

        )))}
      </CarouselContent>
    </Carousel>
  )
}

"use client"

import { CableIcon, CloudIcon, MonitorIcon } from "lucide-react"
import { CarouselBeranda } from "../ui/components/carousel-beranda"
import { Services } from "../ui/services"
import { Publication } from "../ui/publication"
import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery, useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query"

const carouselImages = [
  {
    src: "/test2.png",
    alt: "beranda-1"
  },
  {
    src: "/test5.jpg",
    alt: "beranda-2"
  },
  {
    src: "/test6.jpg",
    alt: "beranda-3"
  }
]

const services = [
  {
    icon: CableIcon,
    title: "Aduan Siber",
    href: "/lapor",
  },
  {
    icon: MonitorIcon,
    title: "Panduan Teknis",
    href: "/lapor",
  },
  {
    icon: CloudIcon,
    title: "Asistensi Pembentukan CSIRT",
    href: "/lapor",
  }
]


export const BerandaView = () => {



  return (
    <div>
      <section>
        <CarouselBeranda />
      </section>
      <Services
        services={services}
      />
      <section>
        <Publication />
      </section>
    </div>
  )
}

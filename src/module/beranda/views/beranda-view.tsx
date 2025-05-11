"use client"

import { CableIcon, CloudIcon, MonitorIcon } from "lucide-react"
import { CarouselBeranda } from "../ui/components/carousel-beranda"
import { Services } from "../ui/services"
import { Publication } from "../ui/publication"

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



// const publications = [
//   {
//     title: "Pentingnya Pemahaman Teknologi Keamanan Siber",
//     description: "Pentingnya Pemahaman Teknologi Keamanan Siber Pentingnya Pemahaman Teknologi Keamanan Siber, Pentingnya Pemahaman Teknologi Keamanan Siber",
//     href: "/lapor",
//     image: "/test6.jpg",
//     cover: "/test2.png",
//     date: new Date(2022, 4, 11),
//     author: "Admin"
//   },
//   {
//     title: "Pentingnya Pemahaman Teknologi Keamanan Siber",
//     description: "Pentingnya Pemahaman Teknologi Keamanan Siber Pentingnya Pemahaman Teknologi Keamanan Siber, Pentingnya Pemahaman Teknologi Keamanan Siber",
//     href: "/lapor",
//     image: "/test5.jpg",
//     cover: "/test2.png",
//     date: new Date(2022, 4, 11),
//     author: "Admin"
//   },
//   {
//     title: "Pentingnya Pemahaman Teknologi Keamanan Siber",
//     description: "Pentingnya Pemahaman Teknologi Keamanan Siber Pentingnya Pemahaman Teknologi Keamanan Siber, Pentingnya Pemahaman Teknologi Keamanan Siber",
//     href: "/lapor",
//     image: "/test6.jpg",
//     cover: "/test2.png",
//     date: new Date(2022, 4, 11),
//     author: "Admin"
//   },
// ]


export const BerandaView = () => {

  // const [data] = trpc.beranda.getTitle.useSuspenseQuery();

  return (
    <div>
      <section>
        <CarouselBeranda carouselImages={carouselImages} />
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

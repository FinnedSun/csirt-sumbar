"use client"

import { CableIcon, CloudIcon, MonitorIcon } from "lucide-react"
import { CarouselBeranda } from "../ui/components/carousel-beranda"
import { Services } from "../ui/services"
import { Publication } from "../ui/publication"

const services = [
  {
    icon: CableIcon,
    title: "Aduan Siber",
    href: "/aduan-siber",
  },
  {
    icon: MonitorIcon,
    title: "Panduan Teknis",
    href: "/lapor", //TODO
  },
  {
    icon: CloudIcon,
    title: "Asistensi Pembentukan CSIRT",
    href: "/lapor", //TOOD
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

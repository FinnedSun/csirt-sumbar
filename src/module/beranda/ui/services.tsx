import Link from "next/link"
import { ServiceTitle } from "./components/service-title"



interface Props {
  services: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    title: string
    href: string
  }[]
}

export const Services = ({
  services,
}: Props) => {
  return (
    <>
      <section >
        <ServiceTitle />
      </section>
      <section>
        <div className="m-1 bg-transparent rounded-lg relative overflow-hidden">
          {/* Gradient dari transparan ke putih */}
          <div className="absolute inset-0 pointer-events-none" />
          <div className="relative">
            <h1 className="text-4xl font-bold text-center my-1 pt-5">Layanan Kami</h1>
            <p className="text-lg text-center flex-1/2">Kami menyediakan layanan yang berkualitas dan terpercaya untuk memenuhi kebutuhan Anda</p>
          </div>
          <div className="flex flex-wrap justify-evenly h-70 relative">
            {services.map((service, index) => (
              <Link href={service.href} key={index} className="flex flex-col items-center justify-center mx-5 my-5 bg-transparent">
                <div className="flex items-center justify-evenly w-16 h-16 bg-pink-400 rounded-full hover:scale-110 transition">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-lg font-bold mt-2">{service.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section >
    </>
  )
}

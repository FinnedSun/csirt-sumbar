import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import {
  Toaster
} from "sonner"

interface Props {
  children: React.ReactNode;
}

const about = {
  address: "Jalan Raya Sumbar - Sumsel",
  addressDetail: "Kecamatan Sumbar Barat, Kabupaten Sumedang, Jawa Barat",
  phone: "8123456789",
  email: "csirt@sumabar.go.id"
}

const BerandaLayout = ({
  children
}: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 mt-20">
        <div className="max-w-screen-xl mx-auto w-full">
          {children}
          <Toaster />

        </div>
      </div>
      <Footer about={about} />
    </div>
  )
}

export default BerandaLayout
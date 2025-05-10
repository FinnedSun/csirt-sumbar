"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { useScrollTop } from "@/hooks/use-scroll-top";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"]
})

interface NavbarItemProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
}

const NavbarItem = ({
  href,
  children,
  isActive
}: NavbarItemProps) => {

  return (
    <Button
      asChild
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>
        {children}
      </Link>
    </Button>
  )
};

const navbarItems = [
  {
    href: "/",
    children: "Beranda"
  },
  {
    href: "/profile",
    children: "Profile"
  },
  {
    href: "/berita",
    children: "Berita"
  },
  {
    href: "/layanan",
    children: "Layanan"
  },
  {
    href: "/aduan-siber",
    children: "Aduan Siber"
  },
  {
    href: "/event",
    children: "Event"
  },
  {
    href: "/hubungi-kami",
    children: "Hubungi Kami"
  },
]

export const Navbar = () => {
  const pathname = usePathname();
  const scroll = useScrollTop();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <nav className={cn(
      'flex h-20 justify-between font-medium bg-white z-50 fixed top-0 w-full',
      scroll && "border-b shadow-sm bg-white/80"
    )}
    >
      <NavbarSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        items={navbarItems}
      />

      <Link href={"/"} className="pl-6 flex items-center">
        <Image
          src={"/logo-sumbar.svg"}
          width={40}
          height={40}
          alt="logo"
          className="mr-2"
        />
        <span className={cn("text-2xl font-semibold", poppins.className)}>
          csirt sumbar
        </span>
      </Link>

      <div className="items-center gap-4 hidden xl:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <div className="flex lg:hidden items-center justify-center mr-4">
        <Button
          variant={"ghost"}
          className="size-12 border-transparent bg-white/80"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  )
}

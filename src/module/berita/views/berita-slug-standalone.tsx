"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Link } from "lucide-react"

interface BeritaSlugStandaloneProps {
  title: string
  children: React.ReactNode
  image?: {
    url: string
    alt: string
  }
  publishedAt?: string
  author?: string
  status?: 'draft' | 'published'
}

export const BeritaSlugStandalone = ({
  title,
  children,
  image,
  publishedAt,
  author,
  status
}: BeritaSlugStandaloneProps) => {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/berita">← Kembali ke Berita {status}</Link>
      </Button>
      <article className="prose dark:prose-invert max-w-none">
        {image?.url && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        <div className="flex items-center gap-4 text-muted-foreground mb-8">
          <p className="text-sm text-gray-500">
            {publishedAt ?
              new Date(publishedAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              }).replace(/\//g, '-')
              : 'Tanggal tidak tersedia'}
          </p>
          <p>•</p>
          <p>
            {author}
          </p>
        </div>

        <>
          {children}
        </>
      </article>
    </div>
  )
}
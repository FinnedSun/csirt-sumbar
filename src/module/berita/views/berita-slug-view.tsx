"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RichText } from "@payloadcms/richtext-lexical/react";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

interface Props {
  beritaId: string;
}

const BeritaSlugView = ({ beritaId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter()
  const { data, error } = useSuspenseQuery(trpc.berita.getOnePublik.queryOptions({
    slug: beritaId
  }))

  useEffect(() => {
    if (error?.data?.code === 'UNAUTHORIZED') {
      toast.error(error.message)
      router.push('/berita')
    }
  }, [error, router])

  if (error) return null

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/berita">← Kembali ke Berita</Link>
      </Button>

      <article className="prose dark:prose-invert max-w-none">
        {data.image?.url && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={data.image.url}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>

        <div className="flex items-center gap-4 text-muted-foreground mb-8">
          <p className="text-sm text-gray-500">
            {data.publishedAt ?
              new Date(data.publishedAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              }).replace(/\//g, '-')
              : 'Tanggal tidak tersedia'}
          </p>
          <p>•</p>
          <p>
            {typeof data.author === 'string' ?
              // If author is just an ID, you'll need to fetch the user data
              // Add a trpc query to get user details by ID
              data.author
              :
              // If author is populated, show name/email
              data.author?.name}
          </p>
        </div>

        <RichText data={data.content} />
      </article>
    </div>
  )
}

export default BeritaSlugView
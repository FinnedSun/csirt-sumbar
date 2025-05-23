import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import Image from "next/image"

export const Publication = () => {

  const trpc = useTRPC();
  const {
    data,
    error
  } = useSuspenseInfiniteQuery(trpc.berita.getMany.infiniteQueryOptions(
    {
      limit: 3,
    },
    {
      getNextPageParam: () => undefined // Non-aktifkan paginasi
    }
  ))

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (data.pages?.[0]?.docs.length === 0) {
    return null
  }

  return (
    <div className="m-1 bg-transparent">
      <h2 className="text-2xl font-bold m-4">Publikasi Terbaru</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {data.pages.flatMap((page) => page.docs.map((berita) => (
          <Card key={berita.id} className="flex flex-col gap-4">
            <CardContent>
              <div className="relative w-full overflow-hidden rounded-xl aspect-video">
                <Image
                  src={berita?.image?.url || "/bg-default.png"}
                  alt={berita.title}
                  fill
                  className="size-full object-cover "
                />
              </div>
              <div className="flex flex-col gap-2">
                <CardTitle className="text-2xl font-bold line-clamp-3">{berita.title}</CardTitle>
                <p className="text-sm text-gray-500">
                  {berita.publishedAt ?
                    new Date(berita.publishedAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    }).replace(/\//g, '-')
                    : 'Tanggal tidak tersedia'}
                </p>
                <p className="text-sm text-gray-500">
                  {typeof berita.author === 'string' ?
                    // If author is just an ID, you'll need to fetch the user data
                    // Add a trpc query to get user details by ID
                    berita.author
                    :
                    // If author is populated, show name/email
                    berita.author?.name}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <CardDescription className="text-sm text-gray-500 line-clamp-3">
                  {berita.description}
                </CardDescription>
                <a href={`/berita/${berita.slug}`} className="text-sm text-blue-500">Baca Selengkapnya</a>
              </div>
            </CardContent>
          </Card>
        )))
        }
      </div>
    </div>

  )
}

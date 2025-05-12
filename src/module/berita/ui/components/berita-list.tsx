import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { InboxIcon } from "lucide-react";
import Image from "next/image"


export const BeritaList = () => {

  const trpc = useTRPC();
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    error
  } = useSuspenseInfiniteQuery(trpc.berita.getMany.infiniteQueryOptions(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
      }
    }
  ))

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-[40vh] w-full'>
        <div className='border border-black border-dashed flex flex-col items-center justify-center p-8 gap-y-4 bg-white rounded-lg'>
          <InboxIcon />
          <p className='text-base font-medium'>
            Belum ada berita
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
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
                  <CardTitle className="text-2xl font-bold">{berita.title}</CardTitle>
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

      <div className='flex justify-center pt-8'>
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className='font-medium disabled:opacity-50 text-base bg-white'
            variant={"outline"}
          >
            Load more...
          </Button>
        )}
      </div>

    </>
  )
}

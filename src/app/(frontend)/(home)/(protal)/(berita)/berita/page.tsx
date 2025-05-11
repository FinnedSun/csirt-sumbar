import { DEFAULT_LIMIT } from '@/constants';
import { BeritaView } from '@/module/berita/views/berita-view';
import { getQueryClient, HydrateClient, trpc } from '@/trpc/server'

export const dynamic = "force-dynamic";

const BeritaPage = () => {

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.berita.getMany.queryOptions({
    limit: DEFAULT_LIMIT,
  }));

  return (
    <HydrateClient>
      <BeritaView />
    </HydrateClient>
  )
}

export default BeritaPage
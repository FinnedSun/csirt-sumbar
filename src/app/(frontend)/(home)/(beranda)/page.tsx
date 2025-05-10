import { BerandaView } from "@/module/beranda/views/beranda-view";
// import { trpc } from "@/trpc/server";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Home() {

  // void trpc.beranda.getTitle.prefetch();
  return (
    <HydrateClient>
      <Suspense fallback={"Loading.."}>
        <ErrorBoundary fallback={"Error.."}>
          <BerandaView />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  )
}

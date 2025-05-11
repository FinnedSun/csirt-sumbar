import { BerandaView } from "@/module/beranda/views/beranda-view";
// import { trpc } from "@/trpc/server";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const dynamic = "force-dynamic"; // defaults to force-static

export default async function Home() {
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

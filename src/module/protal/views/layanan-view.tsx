"use client"

import { RichText } from "@payloadcms/richtext-lexical/react"
import { PortalContent } from "../ui/components/portal-content"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"


const ProfileView = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.portal.getByTitle.queryOptions({
    title: "Layanan"
  }))

  return (
    <PortalContent
      title={data.title}
    >
      <RichText
        data={data.content}
      />
    </PortalContent>
  )
}

export default ProfileView
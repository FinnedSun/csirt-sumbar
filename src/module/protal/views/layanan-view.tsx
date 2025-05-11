"use client"

import { RichText } from "@payloadcms/richtext-lexical/react"
import { ProtalContent } from "../ui/components/portal-content"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"


const ProfileView = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.protal.getByTitle.queryOptions({
    title: "Layanan"
  }))

  return (
    <ProtalContent
      title={data.title}
    >
      <RichText
        data={data.content}
      />
    </ProtalContent>
  )
}

export default ProfileView
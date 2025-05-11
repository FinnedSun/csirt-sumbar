"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { BeritaSlugStandalone } from "./berita-slug-standalone";
import { RichText } from "@payloadcms/richtext-lexical/react";

interface Props {
  beritaId: string;
}

export const PreviewView = ({ beritaId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();

  const { data, error } = useSuspenseQuery(
    trpc.berita.getOneDraft.queryOptions({
      slug: beritaId
    })
  );

  useEffect(() => {
    if (error?.data?.code === 'UNAUTHORIZED') {
      toast.error('Hanya penulis atau admin yang bisa melihat preview');
      router.push('/admin/berita');
    }
  }, [error, router]);

  return (
    <div className="mt-20 p-4 bg-orange-50 border-l-4 border-orange-400">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-orange-800">Preview Draft</h2>
        <p className="text-sm text-orange-700">Status: {data?.status || 'draft'}</p>
      </div>

      <BeritaSlugStandalone
        title={data.title}
        image={{
          url: data.image?.url || '',
          alt: data?.image?.alt || ''
        }}
        publishedAt={data?.publishedAt || ''}
        author={typeof data.author === 'string' ? data.author : data.author?.name}
        status={data?.status || 'draft'}
      >
        <RichText data={data.content} />
      </BeritaSlugStandalone>
    </div>
  );
};
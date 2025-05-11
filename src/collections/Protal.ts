import { isSuperAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'

export const Protal: CollectionConfig = {
  slug: 'protal',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
    read: () => true // Semua user bisa membaca
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Konten',
    },
  ]
}
import { isSuperAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'

export const Carousel: CollectionConfig = {
  slug: 'carousel',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
    read: ({ req }) => isSuperAdmin(req.user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Gambar',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Gambar',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Tautan (Opsional)',
      required: false,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Urutan',
      required: false,
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Aktif',
      defaultValue: true,
    }
  ]
}
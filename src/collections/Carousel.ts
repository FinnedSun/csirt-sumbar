import type { CollectionConfig } from 'payload'

export const Carousel: CollectionConfig = {
  slug: 'carousel',
  admin: {
    useAsTitle: 'title',
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
import type { CollectionConfig } from 'payload'

export const Contact: CollectionConfig = {
  slug: 'contact',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Subjek',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Pesan',
    },
    {
      name: 'createdAt',
      type: 'date',
      label: 'Tanggal Kirim',
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      defaultValue: () => new Date(),
    },
  ]
}
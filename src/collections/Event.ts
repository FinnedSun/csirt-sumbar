import { isSuperAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'

export const Event: CollectionConfig = {
  slug: 'event',
  admin: {
    useAsTitle: 'acara',
  },
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
    read: ({ req }) => isSuperAdmin(req.user),
  },
  fields: [
    {
      name: 'acara',
      type: 'text',
      required: true,
      label: 'Nama Acara',
    },
    {
      name: 'tanggalAwal',
      type: 'date',
      required: true,
      label: 'Tanggal Awal',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'tanggalAkhir',
      type: 'date',
      required: true,
      label: 'Tanggal Akhir',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'tempat',
      type: 'text',
      required: true,
      label: 'Tempat',
    },
    {
      name: 'materi',
      type: 'array',
      label: 'Materi',
      fields: [
        {
          name: 'pembicara',
          type: 'text',
          label: 'Pembicara & Materi',
        }
      ]
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Aktif', value: 'aktif' },
        { label: 'Tidak Aktif', value: 'tidak-aktif' }
      ],
      defaultValue: 'aktif',
      required: true,
    }
  ]
}
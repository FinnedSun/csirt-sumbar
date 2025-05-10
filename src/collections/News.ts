import { isSuperAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'



export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title'
  }, fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Deskripsi',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Gambar',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Konten',
    },
    {
      name: 'author',
      label: 'Penulis',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        hidden: true
      },
      access: {
        update: ({ req }) => isSuperAdmin(req.user)
      }
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      label: 'Status',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Tanggal Publish',
      admin: {
        readOnly: true, // Tidak bisa diubah manual di admin panel
        condition: (data) => data?.status === 'published', // Hanya tampil jika published
        hidden: true
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: false,
      unique: true,
      admin: {
        hidden: true,
      },
    }

  ],
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        if (data) {
          // Slug otomatis dari judul
          if (data.title && (!data.slug || data.slug === '')) {
            data.slug = data.title
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9\-]/g, '')
          }
          // Jika status Published, set publishedAt ke sekarang (tidak bisa diubah manual)
          if (data.status === 'published') {
            data.publishedAt = new Date().toISOString()
          }
          // Jika status Draft, hapus publishedAt
          if (data.status === 'draft') {
            data.publishedAt = undefined
          }
          // Set author otomatis dari user yang login
          if (!data.author && req?.user?.id) {
            data.author = req.user.id
          }
        }
        return data
      }
    ]
  }
}
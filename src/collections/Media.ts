import type { CollectionConfig } from 'payload'
import { isSuperAdmin } from '@/lib/access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: ({ req: { user } }) => {
      if (isSuperAdmin(user)) return true

      return {
        user: {
          equals: user?.id
        }
      }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => isSuperAdmin(user),
    delete: ({ req: { user } }) => isSuperAdmin(user)
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        condition: () => false
      }
    }
  ],
  upload: true,
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return {
          ...data,
          user: req.user?.id || null
        }
      }
    ]
  }
}

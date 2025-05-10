import { isSuperAdmin } from '@/lib/access';
import type { CollectionConfig } from 'payload'


export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  access: {
    read: ({ req, id }) => {
      if (isSuperAdmin(req.user)) return true;
      // Izinkan user membaca data dirinya sendiri (misal untuk /admin/account)
      return req.user?.id === id;
    },
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
    update: ({ req, id }) => {
      if (isSuperAdmin(req.user)) return true;
      return req.user?.id === id;
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Penulis'
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio'
    },
    {
      name: 'roles',
      type: 'select',
      options: [
        {
          label: 'Super Admin',
          value: 'super_admin',
        },
        {
          label: 'User',
          value: 'user',
        }
      ],
      required: true,
      defaultValue: "user",
      admin: {
        position: 'sidebar',
      },
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      }
    },

  ],
  hooks: {
    beforeChange: [
      async ({ req, data, originalDoc }) => {
        // Hanya super_admin yang boleh mengubah roles
        if (data.roles && req.user && !req.user.roles?.includes('super_admin')) {
          data.roles = originalDoc?.roles || ['user']
        }
        return data
      }
    ]
  }
}

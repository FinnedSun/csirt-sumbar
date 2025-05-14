import type { CollectionConfig } from 'payload'

export const Panduan: CollectionConfig = {
  slug: 'panduan',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'File PDF',
      filterOptions: {
        mimeType: { equals: 'application/pdf' }
      }
    },
    {
      name: 'fileSize',
      type: 'number',
      label: 'Ukuran File (byte)',
      admin: {
        readOnly: true,
        description: 'Otomatis terisi saat upload file'
      }
    }
  ],
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        // Jika ada file, ambil ukuran file dari media
        if (data?.file && req.payload) {
          const media = await req.payload.findByID({
            collection: 'media',
            id: data.file,
          });
          if (media?.filesize) {
            data.fileSize = media.filesize;
          }
        }
        return data;
      }
    ]
  }
}
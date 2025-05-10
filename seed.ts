import payload from 'payload'
import dotenv from 'dotenv'

dotenv.config()

const superAdminEmail = 'superadmin@yourdomain.com'
const superAdminPassword = 'supersecurepassword'

const run = async () => {

  // Cek apakah super admin sudah ada
  const existing = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: superAdminEmail,
      },
    },
  })

  if (existing.totalDocs === 0) {
    // Buat akun super admin
    await payload.create({
      collection: 'users',
      data: {
        email: superAdminEmail,
        password: superAdminPassword,
        roles: 'super_admin',
      },
    })
    console.log('Super admin berhasil dibuat!')
  } else {
    console.log('Super admin sudah ada.')
  }

  process.exit()
}

run()
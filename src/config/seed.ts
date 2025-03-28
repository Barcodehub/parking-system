
import { prisma } from "../app";
import bcrypt from 'bcryptjs';

async function seedAdminUser() {
  const adminEmail = 'admin@mail.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin', 10);
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN', // Asegúrate que el enum en schema.prisma tenga ADMIN
      },
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
}

// Ejecutar solo si es el módulo principal
if (require.main === module) {
  seedAdminUser()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export default seedAdminUser;
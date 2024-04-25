import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.users.upsert({
    where: { email: 'admin@email.com' },
    update: {},
    create: {
      name: 'admin',
      age: 21,
      email: 'admin@email.com',
      role: 'ADMIN',
      password: '$2b$10$2zUN7q9T/F7BjoN4XqFZ6elWgT5/SS27GQtnyYLJg/FQF3ttSWwmW', // @Bcd123456
    },
  });
  console.log({ admin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

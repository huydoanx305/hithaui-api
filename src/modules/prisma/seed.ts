import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { mockUsers } from './mocks/users.mock';
import { mockRoles } from './mocks/roles.mock';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: mockRoles,
    skipDuplicates: true,
  });

  const usersHashedPassword = await Promise.all(
    mockUsers.map(async (user) => ({
      ...user,
      password: await bcrypt.hash('12345678', 8),
    })),
  );
  await prisma.user.createMany({
    data: usersHashedPassword,
    skipDuplicates: true,
  });

  const users = await prisma.user.findMany();
  await prisma.rolesOnUsers.createMany({
    data: [...users.map((user) => ({ userId: user.id, roleId: 4 }))],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient, RoleEnum } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const roles: RoleEnum[] = ['user', 'admin', 'manager'];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { role_name: roleName }, 
      update: {},
      create: { role_name: roleName },
    })
  }
}

main().then(async () => {
  await prisma.$disconnect();
})
.catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
})

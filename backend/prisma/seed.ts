import { PrismaClient, RoleEnum } from "@prisma/client";
import { hash } from "argon2";

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

  const adminRole = await prisma.role.findUnique({ where: { role_name: "admin" } });
  if (!adminRole) throw new Error("❌ Role 'manager' not found");


  const admin = {
    email: 'admin@gmail.com',
    password: await hash("123456") ,
  };
  console.log(admin);

  await prisma.user.upsert({
    where: {email: admin.email},
    update: {},
    create: {
      email: admin.email,
      password: admin.password,
      created_at: new Date(),
      updated_at: new Date(),
      role_id: adminRole.role_id
    }
  })

  const managerRole = await prisma.role.findUnique({ where: { role_name: "manager" } });
  if (!managerRole) throw new Error("❌ Role 'manager' not found");

  const manager = {
    email: 'manager@gmail.com',
    password: await hash('123456'),
  }

  await prisma.user.upsert({
    where: {email: manager.email},
    update: {},
    create: {
      email: manager.email,
      password: manager.password,
      created_at: new Date(),
      updated_at: new Date(),
      role_id: managerRole.role_id
    }
  });

  console.log("Users created successfully");
}

main().then(async () => {
  await prisma.$disconnect();
})
.catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
})

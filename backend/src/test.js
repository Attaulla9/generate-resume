const prisma = require("./config/prisma");

async function main() {
  const users = await prisma.user.findMany();
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

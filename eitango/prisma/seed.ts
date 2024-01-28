import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  // delete all
  await prisma.metadata.deleteMany();
  await prisma.tango.deleteMany();
  // seeding
  const metadatas: Prisma.MetadataCreateInput[] = [
    {
      key: "version",
      value: "13.2.1",
    }
  ];
  for (const metadata of metadatas) {
    await prisma.metadata.create({
      data: metadata
    });
  }

  const phrases: Prisma.tangoCreateInput[] = [
    {
        user_id: 1,
        phrase: 'example1',
        meaning: '例文1の意味',
        category: 'example',
        registration_date: new Date(),
        updated_at: new Date(),
        is_passed: 1,
      },
      {
        user_id: 1,
        phrase: 'example2',
        meaning: '例文2の意味',
        category: 'example',
        registration_date: new Date(),
        updated_at: new Date(),
        is_passed: 0,
      },
  ];
  for (const phrase of phrases) {
    await prisma.tango.create({
      data: phrase
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
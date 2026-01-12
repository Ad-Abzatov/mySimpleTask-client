import { PrismaClient } from './generated/prisma';

// yarn ts-node src/Posts.ts

const prisma = new PrismaClient();

const app = async () => {
  console.log('start');

  // const posts = await prisma.toDo.create({
  //   data: {
  //     title: 'first record'
  //   },
  // });

  // console.log(posts);

  const allPosts = await prisma.toDo.findMany();

  console.log(allPosts);

  console.log('finish');
};

app()
  .catch(async (error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

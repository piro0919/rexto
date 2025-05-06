import prisma from "@prisma/client";

export default async function Page(): Promise<React.JSX.Element> {
  const prismaClient = new prisma.PrismaClient();
  const user = await prismaClient.user.findFirst();

  console.log(user);

  return <div>studio</div>;
}

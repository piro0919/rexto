import { currentUser } from "@clerk/nextjs/server";
import prisma from "@db/prisma";
import { Fragment, type ReactNode } from "react";
import AuthLayout from "./_components/Layout";

export type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({
  children,
}: LayoutProps): Promise<React.JSX.Element> {
  const user = await currentUser();

  if (!user) return <Fragment />;

  const exists = await prisma.user.findUnique({
    select: { id: true },
    where: { clerkId: user.id },
  });
  const username = user.username ?? "未設定ユーザー";

  if (!exists) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        // email: user.emailAddresses[0]?.emailAddress ?? "",
        name: username,
      },
    });
  }

  return (
    <AuthLayout imageUrl={user.imageUrl} username={username}>
      {children}
    </AuthLayout>
  );
}

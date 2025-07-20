import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import "./globals.css";
import { type ReactNode } from "react";
import AuthorLayout from "./_components/Layout";

export type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({
  children,
}: LayoutProps): Promise<React.JSX.Element> {
  const user = await currentUser();

  if (!user) {
    notFound();
  }

  return <AuthorLayout>{children}</AuthorLayout>;
}

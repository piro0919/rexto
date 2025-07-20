import "./globals.css";
import { type ReactNode } from "react";
import UserLayout from "./_components/Layout";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return <UserLayout>{children}</UserLayout>;
}

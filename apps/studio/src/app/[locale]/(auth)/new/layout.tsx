import { type ReactNode } from "react";
import NewLayout from "./_components/Layout";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return <NewLayout>{children}</NewLayout>;
}

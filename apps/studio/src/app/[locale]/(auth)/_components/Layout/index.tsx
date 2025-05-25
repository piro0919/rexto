import { type ReactNode } from "react";
import Header from "../Header";
import Navigation from "../Navigation";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <>
      <Header />
      <Navigation />
      {children}
    </>
  );
}

import { type ReactNode } from "react";
import Header from "../Header";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

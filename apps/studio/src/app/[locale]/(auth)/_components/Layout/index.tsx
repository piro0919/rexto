import { type ReactNode } from "react";
import Header from "../Header";
import Navigation from "../Navigation";
import styles from "./style.module.css";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.navigationContainer}>
        <Navigation />
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

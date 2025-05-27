"use client";
import clsx from "clsx";
import { type ReactNode } from "react";
import useMenuStore from "../../useMenuStore";
import Header from "../Header";
import Navigation from "../Navigation";
import styles from "./style.module.css";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const isOpen = useMenuStore((state) => state.isOpen);

  return (
    <div
      className={clsx(styles.container, {
        [styles.closed]: !isOpen,
      })}
    >
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

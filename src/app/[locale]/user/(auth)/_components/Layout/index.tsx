"use client";
import clsx from "clsx";
import { type ReactNode } from "react";
import { useBoolean } from "usehooks-ts";
import Header from "../Header";
import MobileMenu from "../MobileMenu";
import Sidebar from "../Sidebar";
import styles from "./style.module.css";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const { toggle: toggleIsOpen, value: isOpen } = useBoolean(true);

  return (
    <>
      <div className={styles.header}>
        <Header isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
      </div>
      <div className={styles.sidebar}>
        <Sidebar isOpen={isOpen} />
      </div>
      <main className={clsx(styles.main, { [styles.closed]: !isOpen })}>
        {children}
      </main>
      <div className={styles.mobileMenu}>
        <MobileMenu />
      </div>
    </>
  );
}

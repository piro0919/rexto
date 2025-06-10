"use client";
import clsx from "clsx";
import { type ReactNode } from "react";
import useMenuStore from "../../useMenuStore";
import Header, { type HeaderProps } from "../Header";
import Navigation from "../Navigation";
import styles from "./style.module.css";

export type LayoutProps = Pick<HeaderProps, "imageUrl" | "username"> & {
  children: ReactNode;
};

export default function Layout({
  children,
  imageUrl,
  username,
}: LayoutProps): React.JSX.Element {
  const isOpen = useMenuStore((state) => state.isOpen);

  return (
    <div
      className={clsx(styles.container, {
        [styles.closed]: !isOpen,
      })}
    >
      <div className={styles.headerContainer}>
        <Header imageUrl={imageUrl} username={username} />
      </div>
      <div className={styles.navigationContainer}>
        <Navigation />
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

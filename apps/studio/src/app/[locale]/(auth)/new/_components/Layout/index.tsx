import { type ReactNode } from "react";
import styles from "./style.module.css";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <>
      <h1 className={styles.h1}>漫画のアップロード</h1>
      <div>{children}</div>
    </>
  );
}

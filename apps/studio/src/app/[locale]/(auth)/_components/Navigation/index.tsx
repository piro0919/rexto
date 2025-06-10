"use client";
import clsx from "clsx";
import { BarChart2, Book, Layout, Settings } from "feather-icons-react";
import Spacer from "react-spacer";
import { Link, usePathname } from "@/i18n/navigation";
import styles from "./style.module.css";

export default function Navigation(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Link
            className={clsx(styles.link, {
              [styles.current]: pathname === "/",
            })}
            href="/"
          >
            <Layout size={21} />
            <span className={styles.text}>ダッシュボード</span>
          </Link>
        </li>
        <li>
          <Link
            className={clsx(styles.link, {
              [styles.current]: pathname === "/contents",
            })}
            href="/contents"
          >
            <Book size={21} />
            <span className={styles.text}>コンテンツ</span>
          </Link>
        </li>
        <li>
          <Link
            className={clsx(styles.link, {
              [styles.current]: pathname === "/analytics",
            })}
            href="/analytics"
          >
            <BarChart2 size={21} />
            <span className={styles.text}>アナリティクス</span>
          </Link>
        </li>
      </ul>
      <Spacer grow={1} />
      <ul className={styles.list}>
        <li>
          <Link
            className={clsx(styles.link, {
              [styles.current]: pathname === "/settings",
            })}
            href="/settings"
          >
            <Settings size={21} />
            <span className={styles.text}>設定</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

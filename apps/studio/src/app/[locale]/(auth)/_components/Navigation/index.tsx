"use client";
import { Link, usePathname } from "@/i18n/navigation";
import clsx from "clsx";
import { Layers, Layout } from "feather-icons-react";
import styles from "./style.module.css";

export default function Navigation(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul>
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
              [styles.current]: pathname === "/hoge",
            })}
            href="/"
          >
            <Layers size={21} />
            <span className={styles.text}>コンテンツ</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

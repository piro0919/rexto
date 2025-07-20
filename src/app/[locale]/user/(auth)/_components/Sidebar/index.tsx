import clsx from "clsx";
import { BookOpen, Search, Settings } from "react-feather";
import { Link, usePathname } from "@/i18n/navigation";
import styles from "./style.module.css";

export type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps): React.JSX.Element {
  const pathname = usePathname();

  return (
    <aside className={clsx(styles.sidebar, { [styles.closed]: !isOpen })}>
      <ul>
        <li>
          <Link
            className={clsx(styles.link, {
              [styles.current]: pathname === "/ja" || pathname === "/en",
            })}
            href="/"
          >
            <BookOpen size={21} />
            <span>本棚</span>
          </Link>
          <Link
            className={clsx(styles.link, {
              [styles.current]:
                pathname === "/ja/search" || pathname === "/en/search",
            })}
            href="/search"
          >
            <Search size={21} />
            <span>探す</span>
          </Link>
          <Link
            className={clsx(styles.link, {
              [styles.current]:
                pathname === "/ja/settings" || pathname === "/en/settings",
            })}
            href="/settings"
          >
            <Settings size={21} />
            <span>設定</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

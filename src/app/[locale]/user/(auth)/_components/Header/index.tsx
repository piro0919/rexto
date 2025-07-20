import { useUser } from "@clerk/nextjs";
import { Menu, MenuButton, MenuDivider, MenuItem } from "@szhsin/react-menu";
import clsx from "clsx";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { LogOut, Settings } from "react-feather";
import Spacer from "react-spacer";
import { Link } from "@/i18n/navigation";
import styles from "./style.module.css";

const Hamburger = dynamic(async () => import("hamburger-react"), {
  ssr: false,
});
const lexend = Lexend({
  subsets: ["latin"],
  weight: "700",
});

export type HeaderProps = {
  isOpen: boolean;
  toggleIsOpen: () => void;
};

export default function Header({
  isOpen,
  toggleIsOpen,
}: HeaderProps): React.JSX.Element {
  const { user } = useUser();
  const { theme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.hamburger}>
        <Hamburger size={18} toggle={toggleIsOpen} toggled={!isOpen} />
      </div>
      <Spacer width="6px" />
      <Link className={clsx(lexend.className, styles.title)} href="/">
        Rexto
      </Link>
      <Spacer grow={1} />
      {user ? (
        <Menu
          menuButton={
            <MenuButton className={styles.userButton}>
              <Image
                alt={user.fullName!}
                height={32}
                src={user.imageUrl}
                width={32}
              />
            </MenuButton>
          }
          align="end"
          gap={6}
          menuClassName={styles.menu}
          theming={theme}
          transition={true}
        >
          <MenuItem>
            <Link className={styles.link} href="/sign-out">
              <LogOut size={15} />
              <span>ログアウト</span>
            </Link>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <Link className={styles.link} href="/settings">
              <Settings size={15} />
              <span>設定</span>
            </Link>
          </MenuItem>
        </Menu>
      ) : null}
    </header>
  );
}

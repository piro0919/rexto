"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Menu } from "feather-icons-react";
import useMenuStore from "../../useMenuStore";
import styles from "./style.module.css";

export default function Header(): React.JSX.Element {
  const toggleIsOpen = useMenuStore((state) => state.toggleIsOpen);

  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={toggleIsOpen}>
        <Menu size={21} />
      </button>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                height: 36,
                width: 36,
              },
            },
          }}
        />
      </SignedIn>
    </header>
  );
}

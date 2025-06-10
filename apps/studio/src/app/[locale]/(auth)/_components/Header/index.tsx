"use client";
import { Menu } from "feather-icons-react";
import Spacer from "react-spacer";
import useMenuStore from "../../useMenuStore";
import CreateButton from "../CreateButton";
import UserButton, { type UserButtonProps } from "../UserButton";
import styles from "./style.module.css";

export type HeaderProps = Pick<UserButtonProps, "imageUrl" | "username">;

export default function Header({
  imageUrl,
  username,
}: HeaderProps): React.JSX.Element {
  const toggleIsOpen = useMenuStore((state) => state.toggleIsOpen);

  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={toggleIsOpen}>
        <Menu size={21} />
      </button>
      <Spacer grow={1} />
      <CreateButton />
      <UserButton imageUrl={imageUrl} username={username} />
    </header>
  );
}

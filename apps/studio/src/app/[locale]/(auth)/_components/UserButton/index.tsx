import { Avatar, DropdownMenu } from "radix-ui";
import styles from "./style.module.css";

export type UserButtonProps = {
  imageUrl: string;
  username: string;
};

export default function UserButton({
  imageUrl,
  username,
}: UserButtonProps): React.JSX.Element {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild={true}>
        <button className={styles.userButton}>
          <Avatar.Root>
            <Avatar.Image alt={username} src={imageUrl} />
          </Avatar.Root>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.content}>
          <DropdownMenu.Item>ログアウトする</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

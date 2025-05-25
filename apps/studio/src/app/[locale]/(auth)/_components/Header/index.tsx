import { SignedIn, UserButton } from "@clerk/nextjs";
import styles from "./style.module.css";

export default function Header(): React.JSX.Element {
  return (
    <header className={styles.header}>
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

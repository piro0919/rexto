import { SignIn as ClerkSignIn } from "@clerk/nextjs";
import styles from "./style.module.css";

export default function SignIn(): React.JSX.Element {
  return (
    <div className={styles.container}>
      <ClerkSignIn />
    </div>
  );
}

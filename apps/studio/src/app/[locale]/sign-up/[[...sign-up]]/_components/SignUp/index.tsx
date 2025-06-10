import { SignUp as ClerkSignUp } from "@clerk/nextjs";
import styles from "./style.module.css";

export default function SignUp(): React.JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <ClerkSignUp />
      </div>
    </div>
  );
}

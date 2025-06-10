import { UploadCloud } from "feather-icons-react";
import { Link } from "@/i18n/navigation";
import styles from "./style.module.css";

export default function CreateButton(): React.JSX.Element {
  return (
    <Link className={styles.createLink} href="/new/upload">
      <UploadCloud size={21} />
      <span>作成</span>
    </Link>
  );
}

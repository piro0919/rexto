import { Link } from "@/i18n/navigation";

export default function Navigation(): React.JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">ダッシュボード</Link>
        </li>
        <li>
          <Link href="/">コンテンツ</Link>
        </li>
      </ul>
    </nav>
  );
}

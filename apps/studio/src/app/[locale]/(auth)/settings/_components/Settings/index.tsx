"use client";
import { CheckCircle, MinusCircle } from "feather-icons-react";
import { useTheme } from "next-themes";
import { Toggle } from "radix-ui";
import { useMemo } from "react";
import styles from "./style.module.css";

export default function Settings(): React.JSX.Element {
  const { setTheme, theme } = useTheme();
  const isDark = useMemo(() => theme === "dark", [theme]);

  return (
    <div>
      <h1 className={styles.h1}>設定</h1>
      <section className={styles.section}>
        <h2 className={styles.h2}>ダークモード</h2>
        <div>
          <div className={styles.field}>
            <Toggle.Root
              onPressedChange={(pressed) =>
                setTheme(pressed ? "dark" : "light")
              }
              aria-label="Toggle darkmode"
              defaultPressed={isDark}
              id="darkmode"
              pressed={isDark}
            >
              {isDark ? <CheckCircle size={18} /> : <MinusCircle size={18} />}
            </Toggle.Root>
            <label className={styles.label} htmlFor="darkmode">
              {isDark ? "オン" : "オフ"}
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}

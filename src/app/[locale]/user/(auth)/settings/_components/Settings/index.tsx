import styles from "./style.module.css";

export default function Settings(): React.JSX.Element {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>外観</h2>
        <dl>
          <div className={styles.item}>
            <dt className={styles.term}>デザイン</dt>
            <dd className={styles.description}></dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

import styles from "./Insert.module.css";
export default function Insert({ value }) {
  return (
    <input
      value={value}
      onChange={() => {}}
      type="text"
      className={styles["calculator-insert"]}
    />
  );
}

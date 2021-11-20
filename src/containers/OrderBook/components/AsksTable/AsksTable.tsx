import { formatNumber } from "../../../../utils/formatNumber";

import styles from "./AsksTable.module.css";
import { AsksTableProps } from "./AsksTableProps";

const AsksTable = ({ asks, highestTotal }: AsksTableProps) => {
  return (
    <div className={styles.asks}>
      <span className={styles.header}>Price</span>
      <span className={styles.header}>Size</span>
      <span className={styles.header}>Total</span>
      {asks.map(([price, size, total]) => (
        <div key={price} className={styles.gridRow}>
          <span className={[styles.row, styles.price].join(" ")}>
            {formatNumber(price, { minimumFractionDigits: 2 })}
          </span>
          <span className={styles.row}>{formatNumber(size)}</span>
          <span className={styles.row}>{formatNumber(total)}</span>
        </div>
      ))}
    </div>
  );
};

export { AsksTable };

import { formatNumber } from "../../../../utils/formatNumber";

import styles from "./BidsTable.module.css";
import { BidsTableProps } from "./BidsTableProps";

const BidsTable = ({ bids, highestTotal }: BidsTableProps) => {
  return (
    <div className={styles.bids}>
      <span className={styles.header}>Total</span>
      <span className={styles.header}>Size</span>
      <span className={styles.header}>Price</span>
      {bids.map(([price, size, total]) => (
        <div key={price} className={styles.gridRow}>
          <span className={styles.row}>{formatNumber(total)}</span>
          <span className={styles.row}>{formatNumber(size)}</span>
          <span className={[styles.row, styles.price].join(" ")}>
            {formatNumber(price, { minimumFractionDigits: 2 })}
          </span>
        </div>
      ))}
    </div>
  );
};

export { BidsTable };

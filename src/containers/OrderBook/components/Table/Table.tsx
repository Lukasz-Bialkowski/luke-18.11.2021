import { formatNumber } from '../../../../utils/formatNumber';
import { TableProps } from './TableProps';
import styles from './Table.module.css';

const Table = ({ bids, asks }: TableProps) => {
  return (
    <>
      <div className={styles.bids}>
        <span className={styles.header}>Total</span>
        <span className={styles.header}>Size</span>
        <span className={styles.header}>Price</span>
        {bids.map(([price, size, total]) => (
          <div key={price} className={styles.gridRow}>
            <span className={styles.row}>{formatNumber(total)}</span>
            <span className={styles.row}>{formatNumber(size)}</span>
            <span className={[styles.row, styles.bidsPrice].join(" ")}>
              {formatNumber(price, { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.asks}>
        <span className={styles.header}>Price</span>
        <span className={styles.header}>Size</span>
        <span className={styles.header}>Total</span>
        {asks.map(([price, size, total]) => (
          <div key={price} className={styles.gridRow}>
            <span className={[styles.row, styles.asksPrice].join(" ")}>
              {formatNumber(price, { minimumFractionDigits: 2 })}
            </span>
            <span className={styles.row}>{formatNumber(size)}</span>
            <span className={styles.row}>{formatNumber(total)}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export {
  Table,
}

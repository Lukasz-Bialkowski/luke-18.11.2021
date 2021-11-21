import { formatNumber } from "../../../../utils/formatNumber";
import { TableProps } from "./TableProps";
import styles from "./Table.module.css";
import { useViewport } from "../../hooks/useViewport";
import { BookType } from "../../../../constants/enums/BookType";

const Table = ({ bids, asks, highestBid, lowestAsk }: TableProps) => {
  const { isMobile } = useViewport();

  const generateMobileRows = (data: number[][], type: BookType) => {
    return (
      <div
        className={[type === BookType.ASKS ? styles.asks : styles.bids].join(
          " "
        )}
      >
        {type === BookType.ASKS && [
          <span key="price" className={styles.header}>
            Price
          </span>,
          <span key="size" className={styles.header}>
            Size
          </span>,
          <span key="total" className={styles.header}>
            Total
          </span>,
        ]}
        {data.map(([price, size, total]) => (
          <div key={price} className={styles.gridRow}>
            <span
              className={[
                styles.row,
                type === BookType.ASKS ? styles.asksPrice : styles.bidsPrice,
              ].join(" ")}
            >
              {formatNumber(price, { minimumFractionDigits: 2 })}
            </span>
            <span className={styles.row}>{formatNumber(size)}</span>
            <span className={styles.row}>{formatNumber(total)}</span>
          </div>
        ))}
      </div>
    );
  };

  const generateDesktopAsks = (data: number[][]) => {
    return (
      <div className={styles.asks}>
        <span className={styles.header}>Price</span>
        <span className={styles.header}>Size</span>
        <span className={styles.header}>Total</span>
        {data.map(([price, size, total]) => (
          <div key={price} className={styles.gridRow}>
            <span className={[styles.row, styles.asksPrice].join(" ")}>
              {formatNumber(price, { minimumFractionDigits: 2 })}
            </span>
            <span className={styles.row}>{formatNumber(size)}</span>
            <span className={styles.row}>{formatNumber(total)}</span>
          </div>
        ))}
      </div>
    );
  };

  const generateDesktopBids = (data: number[][]) => {
    return (
      <div className={styles.bids}>
        <span className={styles.header}>Total</span>
        <span className={styles.header}>Size</span>
        <span className={styles.header}>Price</span>
        {data.map(([price, size, total]) => (
          <div key={price} className={styles.gridRow}>
            <span className={styles.row}>{formatNumber(total)}</span>
            <span className={styles.row}>{formatNumber(size)}</span>
            <span className={[styles.row, styles.bidsPrice].join(" ")}>
              {formatNumber(price, { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.tableWrapper}>
      {!asks.length && !bids.length ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <>
          <span className={styles.spread}>
            Spread: {formatNumber(highestBid - lowestAsk)}
          </span>
          {isMobile
            ? generateMobileRows(bids, BookType.BIDS)
            : generateDesktopBids(bids)}
          {isMobile
            ? generateMobileRows(asks, BookType.ASKS)
            : generateDesktopAsks(asks)}
        </>
      )}
    </div>
  );
};

export { Table };

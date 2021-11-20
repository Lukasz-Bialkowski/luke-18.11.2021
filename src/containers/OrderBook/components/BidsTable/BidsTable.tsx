import { formatNumber } from "../../../../utils/formatNumber";

import styles from "./BidsTable.module.css";
import { BidsTableProps } from "./BidsTableProps";

const BidsTable = ({ bids, highestTotal }: BidsTableProps) => {
  return (
    <table className={styles.bids}>
      <thead>
        <tr>
          <th colSpan={3}>BIDS</th>
        </tr>
        <tr>
          <th>TOTAL</th>
          <th>SIZE</th>
          <th>PRICE</th>
        </tr>
      </thead>
      <tbody>
        {bids.map(([price, size, total]) => (
          <tr key={price}>
            <td className={styles.bids}>{formatNumber(total)}</td>
            <td>{formatNumber(size)}</td>
            <td className={styles.price}>{formatNumber(price, { minimumFractionDigits: 2 })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { BidsTable };

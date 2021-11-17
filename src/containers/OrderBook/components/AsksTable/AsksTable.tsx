import { formatNumber } from "../../../../utils/formatNumber";

import styles from "./AsksTable.module.css";
import { AsksTableProps } from "./AsksTableProps";

const AsksTable = ({ asks }: AsksTableProps) => {
  return (
    <table className={styles.asks}>
      <thead>
        <tr>
          <th colSpan={3}>ASKS</th>
        </tr>
        <tr>
          <th>PRICE</th>
          <th>SIZE</th>
          <th>TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {asks.map(([price, size, total]) => (
          <tr key={price}>
            <td>{formatNumber(price, { minimumFractionDigits: 2 })}</td>
            <td>{formatNumber(size)}</td>
            <td>{formatNumber(total)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { AsksTable };

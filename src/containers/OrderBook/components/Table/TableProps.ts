export type TableProps = {
  asks: [[number, number, number]] | [];
  bids: [[number, number, number]] | [];
  highestTotal: number;
}
export type TableProps = {
  asks: [[number, number, number]] | [];
  bids: [[number, number, number]] | [];
  highestBid: number;
  lowestAsk: number;
  highestTotal: number;
};

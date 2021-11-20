import { useCallback, useEffect, useState } from "react";
import { useThrottle } from "rooks";

const asksBusket = new Map<number, Array<number> | number>();
const bidsBusket = new Map<number, Array<number> | number>();

const useBookData = () => {
  const [asks, setAsks] = useState<[[number, number, number]] | []>([]);
  const [bids, setBids] = useState<[[number, number, number]] | []>([]);
  const [highestBid, setHighestBid] = useState(0);
  const [lowestAsk, setLowestAsk] = useState(0);
  const [highestTotal, setHighestTotal] = useState(0);

  const parseData = useCallback((message: any) => {
    try {
      const jsonMessage = JSON.parse(message.data);
      const {
        bids: newBids,
        asks: newAsks,
      }: { bids: [[number, number]]; asks: [[number, number]] } = jsonMessage;

      if (newAsks) {
        for (let [key, value] of newAsks) {
          asksBusket.set(key, value);
        }
      }

      if (newBids) {
        for (let [key, value] of newBids) {
          bidsBusket.set(key, value);
        }
      }
    } catch (err) {
      console.log("Parsing error", err);
    }
  }, []);

  const clearData = useCallback(() => {
    asksBusket.clear();
    bidsBusket.clear();
    setAsks([]);
    setBids([]);
    setHighestBid(0);
    setLowestAsk(0);
  }, []);

  const prepareAsksForRender = () => {
    const sortedAsks = new Map([...asksBusket].sort());

    const asksArr: any = [];
    let lowestPrice: any = +Infinity;
    let highestTotal = -Infinity;
    let total = 0;

    for (let [price, size] of sortedAsks) {
      if (size !== 0) {
        total += size as number;
        asksArr.push([price, size, total]);

        if (lowestPrice > price) {
          lowestPrice = price;
        }
        if (total > highestTotal) {
          highestTotal = total as number;
        }
      }
    }

    setLowestAsk(lowestPrice);
    setAsks(asksArr);
    setHighestTotal((currentHighestTotal) =>
      currentHighestTotal < highestTotal ? highestTotal : currentHighestTotal
    );
  };

  const prepareBidsForRender = () => {
    const sortedBids = new Map(
      [...bidsBusket].sort((a, b) => (a > b ? -1 : 1))
    );

    const bidsArr: any = [];
    let highestPrice = -Infinity;
    let highestTotal = -Infinity;
    let total = 0;

    for (let [price, size] of sortedBids) {
      if (size !== 0) {
        total += size as number;
        bidsArr.push([price, size, total]);

        if (highestPrice < price) {
          highestPrice = price as number;
        }
        if (total > highestTotal) {
          highestTotal = total as number;
        }
      }
    }

    setHighestBid(highestPrice);
    setBids(bidsArr);
    setHighestTotal((currentHighestTotal) =>
      currentHighestTotal < highestTotal ? highestTotal : currentHighestTotal
    );
  };

  const [throttledFunctionAsks] = useThrottle(prepareAsksForRender, 1000);
  const [throttledFunctionBids] = useThrottle(prepareBidsForRender, 1000);

  useEffect(() => {
    throttledFunctionAsks();
    throttledFunctionBids();
  }, [throttledFunctionAsks, throttledFunctionBids]);

  return {
    asks,
    bids,
    highestTotal,
    highestBid,
    lowestAsk,
    parseData,
    clearData,
  };
};

export { useBookData };

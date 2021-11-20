import { useCallback, useEffect, useState } from "react";
import { useThrottle } from "rooks";

const useBookData = () => {
  const [asks, setAsks] = useState<Map<number, Array<number> | number>>(
    new Map()
  );
  const [bids, setBids] = useState<Map<number, Array<number> | number>>(
    new Map()
  );
  const [asksArr, setAsksArr] = useState<[[number, number, number]] | []>([]);
  const [bidsArr, setBidsArr] = useState<[[number, number, number]] | []>([]);
  const [highestBid, setHighestBid] = useState(0);
  const [lowestAsk, setLowestAsk] = useState(0);


  const parseData = useCallback((message: any) => {
    try {
      const jsonMessage = JSON.parse(message.data);
      const {
        bids: newBids,
        asks: newAsks,
      }: { bids: [[number, number]]; asks: [[number, number]] } = jsonMessage;

      if (newAsks) {
        setAsks((oldAsks) => new Map([...oldAsks, ...newAsks]));
      }

      if (newBids) {
        setBids((oldBids) => new Map([...oldBids, ...newBids]));
      }
    } catch (err) {
      console.log("Parsing error", err);
    }
  }, []);

  const clearData = useCallback(() => {
    setAsks(new Map());
    setBids(new Map());
    setAsksArr([]);
    setBidsArr([]);
    setHighestBid(0);
    setLowestAsk(0);
  }, []);

  const prepareAsksForRender = () => {
    const sortedAsks = new Map([...asks].sort());

    const asksArr: any = [];
    let lowestPrice: any = +Infinity;
    let total = 0;

    for (let [price, count] of sortedAsks) {
      if (count !== 0) {
        total += count as number;
        asksArr.push([price, count, total]);

        if (lowestPrice > price) {
          lowestPrice = price;
        }
      }
    }

    setLowestAsk(lowestPrice);
    setAsksArr(asksArr);
  };

  const prepareBidsForRender = () => {
    const sortedBids = new Map([...bids].sort((a, b) => (a > b ? -1 : 1)));

    const bidsArr: any = [];
    let total = 0;
    let highestPrice = 0;

    for (let [price, count] of sortedBids) {
      if (count !== 0) {
        total += count as number;
        bidsArr.push([price, count, total]);

        if (highestPrice < price) {
          highestPrice = price as number;
        }
      }
    }

    setHighestBid(highestPrice);
    setBidsArr(bidsArr);
  };

  const [throttledFunctionAsks] = useThrottle(prepareAsksForRender, 1000);
  const [throttledFunctionBids] = useThrottle(prepareBidsForRender, 1000);

  useEffect(() => {
    throttledFunctionAsks();
    throttledFunctionBids();
  }, [asks, bids, throttledFunctionAsks, throttledFunctionBids]);

  return {
    asks: asksArr,
    bids: bidsArr,
    highestBid: highestBid,
    lowestAsk: lowestAsk,
    parseData,
    clearData,
  };
};

export { useBookData };

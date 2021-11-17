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

  const clearData = useCallback(() => {
    setAsks(new Map());
    setBids(new Map());
    setAsksArr([]);
    setBidsArr([]);
  }, []);

  const prepareAsksForRender = () => {
    const sortedAsks = new Map([...asks].sort());

    const tempArr: any = [];
    let lowest: any = +Infinity;
    let sum = 0;

    for (let [key, value] of sortedAsks) {
      if (value !== 0) {
        sum += value as number;
        tempArr.push([key, value, sum]);

        if (lowest > key) {
          lowest = key;
        }
      }
    }

    setLowestAsk(lowest);
    setAsksArr(tempArr);
  };

  const prepareBidsForRender = () => {
    const sortedBids = new Map([...bids].sort((a, b) => (a > b ? -1 : 1)));

    const tempArr: any = [];
    let sum = 0;
    let highest = 0;

    for (let [key, value] of sortedBids) {
      if (value !== 0) {
        sum += value as number;
        tempArr.push([key, value, sum]);

        if (highest < key) {
          highest = key as number;
        }
      }
    }

    setHighestBid(highest);
    setBidsArr(tempArr);
  };

  const [throttledFunctionAsks] = useThrottle(prepareAsksForRender, 500);
  const [throttledFunctionBids] = useThrottle(prepareBidsForRender, 500);

  useEffect(() => {
    throttledFunctionAsks();
    throttledFunctionBids();
  }, [asks, bids, throttledFunctionAsks, throttledFunctionBids]);

  const parseData = useCallback((message: any) => {
    console.log(message);
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

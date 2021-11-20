import { useCallback, useContext, useEffect, useState } from "react";

import { buildOpenMessage, FeedEvent, FeedTypes } from "./OrderBookProps";
import { ContractType } from "../../constants/enums/OrderBookContractTypes";
import { OrderBookContext } from "../../context/WebSocket";
import { useBookData } from "./hooks/useBookData";
import { formatNumber } from "../../utils/formatNumber";
import { AsksTable } from "./components/AsksTable";
import { BidsTable } from "./components/BidsTable";
import styles from "./OrderBook.module.css";


const OrderBook = () => {
  const [isSubscribed, setSubscribed] = useState(false);
  const [contract, setContract] = useState<ContractType>(ContractType.XBT);

  const { ws } = useContext(OrderBookContext);
  const { asks, bids, highestBid, lowestAsk, parseData, clearData } =
    useBookData();

  const onMessage = useCallback(
    (message: Event) => {
      parseData(message);
    },
    [parseData]
  );

  useEffect(() => {
    ws?.addEventListener("message", onMessage);

    return () => {
      unsubscribe();
      ws?.removeEventListener("message", onMessage);
    }
  }, [ws]);

  const unsubscribe = useCallback(() => {
    if (ws?.readyState === WebSocket.OPEN) {
      setSubscribed(false);
      ws.send(
        JSON.stringify(
          buildOpenMessage(FeedEvent.UNSUBSCRIBE, FeedTypes.BOOK, [
            contract,
          ])
        )
      );
    }
  }, [ws, contract]);

  const subscribe = useCallback(() => {
    if (ws?.readyState === WebSocket.OPEN) {
      setSubscribed(true);
      ws.send(
        JSON.stringify(
          buildOpenMessage(FeedEvent.SUBSCRIBE, FeedTypes.BOOK, [contract])
        )
      );
    }
  }, [ws, contract]);

  useEffect(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      subscribe();
    }
  }, [ws, contract, subscribe]);

  const changeContract = () => {
    clearData();
    unsubscribe();
    setContract((type) =>
      type === ContractType.ETH
        ? ContractType.XBT
        : ContractType.ETH
    );
  };

  return (
    <div className={styles.orderBook}>
      <h1>Order book ({contract})</h1>
      <div className={styles.topSection}>
        <div className={styles.actionButtons}>
          <button onClick={changeContract}>Toggle Feed</button>
          <button disabled={isSubscribed} onClick={subscribe}>
            Start updating
          </button>
          <button disabled={!isSubscribed} onClick={unsubscribe}>
            Stop updating
          </button>
        </div>
        <span>Spread: {formatNumber(highestBid - lowestAsk)}</span>
      </div>
      <div className={styles.tableWrapper}>
        <BidsTable bids={bids} />
        <AsksTable asks={asks} />
      </div>
    </div>
  );
};

export { OrderBook };

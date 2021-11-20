import { useCallback, useEffect, useState, useRef } from "react";

import { buildOpenMessage, FeedEvent, FeedTypes } from "./OrderBookProps";
import { ContractType } from "../../constants/enums/OrderBookContractTypes";
import { useBookData } from "./hooks/useBookData";
import { formatNumber } from "../../utils/formatNumber";
import { AsksTable } from "./components/AsksTable";
import { BidsTable } from "./components/BidsTable";
import { ORDER_BOOK_WS_API_URL } from "../../constants/config";
import styles from "./OrderBook.module.css";
import { Button } from "../../components/Button";

const OrderBook = () => {
  const [isSubscribed, setSubscribed] = useState(false);
  const [contract, setContract] = useState<ContractType>(ContractType.XBT);
  const ws = useRef<WebSocket | null>();
  const {
    asks,
    bids,
    highestBid,
    lowestAsk,
    highestTotal,
    parseData,
    clearData,
  } = useBookData();

  const onMessage = useCallback(
    (message: Event) => {
      parseData(message);
    },
    [parseData]
  );

  useEffect(() => {
    const currentWs = new WebSocket(ORDER_BOOK_WS_API_URL);
    ws.current = currentWs;
    currentWs?.addEventListener("open", subscribe);
    currentWs?.addEventListener("message", onMessage);

    return () => {
      unsubscribe();
      clearData();
      currentWs?.removeEventListener("message", onMessage);
      currentWs?.close();
    };
    // eslint-disable-next-line
  }, []);

  const unsubscribe = useCallback(() => {
    if (ws?.current?.readyState === WebSocket.OPEN) {
      setSubscribed(false);
      ws?.current?.send(
        JSON.stringify(
          buildOpenMessage(FeedEvent.UNSUBSCRIBE, FeedTypes.BOOK, [contract])
        )
      );
    }
  }, [ws, contract]);

  const subscribe = useCallback(() => {
    if (ws?.current?.readyState === WebSocket.OPEN) {
      setSubscribed(true);
      ws?.current?.send(
        JSON.stringify(
          buildOpenMessage(FeedEvent.SUBSCRIBE, FeedTypes.BOOK, [contract])
        )
      );
    }
  }, [ws, contract]);

  useEffect(() => {
    if (ws?.current?.readyState === WebSocket.OPEN) {
      subscribe();
    }
  }, [ws, contract, subscribe]);

  const changeContract = () => {
    clearData();
    unsubscribe();
    setContract((type) =>
      type === ContractType.ETH ? ContractType.XBT : ContractType.ETH
    );
  };

  return (
    <div className={styles.wrapper}>
      <h1>Order book ({contract})</h1>
      <div className={styles.topSection}>
        <Button text="Toggle Feed" onClick={changeContract} type="primary" />
        <Button
          text={isSubscribed ? "Stop" : "Start"}
          onClick={isSubscribed ? unsubscribe : subscribe}
          type="secondary"
        />
      </div>
      <div className={styles.tableWrapper}>
        <span className={styles.spread}>
          Spread: {formatNumber(highestBid - lowestAsk)}
        </span>
        <BidsTable bids={bids} highestTotal={highestTotal} />
        <AsksTable asks={asks} highestTotal={highestTotal} />
      </div>
    </div>
  );
};

export { OrderBook };

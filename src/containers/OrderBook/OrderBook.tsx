import { useCallback, useContext, useEffect, useState } from "react";

import { buildOpenMessage, FeedEvent, FeedTypes } from "./OrderBookProps";

import { OrderBookContractType } from "../../constants/enums/OrderBookContractTypes";
import { SocketContext } from "../../context/WebSocket";
import { useBookData } from "./hooks/useBookData";

import styles from "./OrderBook.module.css";
import { formatNumber } from "../../utils/formatNumber";
import { AsksTable } from "./components/AsksTable";
import { BidsTable } from "./components/BidsTable";

const OrderBook = () => {
  const [isSubscribed, setSubscribed] = useState(false);
  const { socket } = useContext(SocketContext);
  const { asks, bids, highestBid, lowestAsk, parseData, clearData } =
    useBookData();
  const [contractType, setContractType] = useState<OrderBookContractType>(
    OrderBookContractType.XBT
  );

  const handleMessage = useCallback(
    (message: Event) => {
      parseData(message);
    },
    [parseData]
  );

  useEffect(() => {
    if (socket) {
      socket.addEventListener("message", handleMessage);
      socket.addEventListener("close", () => {
        socket?.removeEventListener("message", handleMessage);
      });
    }
  }, [socket, handleMessage]);

  const unsubscribe = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      setSubscribed(false);
      socket.send(
        JSON.stringify(
          buildOpenMessage(FeedEvent.UNSUBSCRIBE, FeedTypes.BOOK, [
            contractType,
          ])
        )
      );
    }
  };

  const subscribe = useCallback(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      setSubscribed(true);
      socket.send(
        JSON.stringify(
          buildOpenMessage(FeedEvent.SUBSCRIBE, FeedTypes.BOOK, [contractType])
        )
      );
    }
  }, [socket, contractType]);

  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      subscribe();
    }
  }, [socket, contractType, subscribe]);

  const handleContractToggle = () => {
    clearData();
    unsubscribe();
    setContractType((type) =>
      type === OrderBookContractType.ETH
        ? OrderBookContractType.XBT
        : OrderBookContractType.ETH
    );
  };

  useEffect(
    () => () => {
      socket?.removeEventListener("message", handleMessage);
      unsubscribe();
    }, // eslint-disable-next-line
    []
  );

  return (
    <div className={styles.orderBook}>
      <h1>Order book ({contractType})</h1>
      <div className={styles.topSection}>
        <div className={styles.actionButtons}>
          <button onClick={handleContractToggle}>Toggle Feed</button>
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

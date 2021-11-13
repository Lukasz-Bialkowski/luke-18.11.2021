import { useEffect, useRef, useState } from "react";
import { ORDER_BOOK_WS_API_URL } from "../../config";
import { OrderBookContractType } from "../../constants/enums/OrderBookContractTypes";
import { buildOpenMessage, FeedEvent, FeedTypes } from "./constants";

const OrderBook = () => {
  const socket = useRef<WebSocket | null>(null);
  const [opened, setOpened] = useState(false);
  const [running, setRunning] = useState(false);
  const [contractType, setContractType] = useState<OrderBookContractType>(OrderBookContractType.XBT);

  useEffect(() => {
    const currectSocket = socket.current;
    return () => {
      if (currectSocket) {
        currectSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (socket.current && opened) {
      subscribe(contractType)
    }
  }, [opened, contractType]);

  const messageHandler = (message: any) => {
    console.log(message);
  };

  const initializeWebSocket = () => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.close();
    }
    socket.current = new WebSocket(ORDER_BOOK_WS_API_URL);

    socket.current.addEventListener("open", () => setOpened(true));
    socket.current.addEventListener("close", () => setOpened(false));
    socket.current.addEventListener("message", messageHandler);
  }

  const unsubscribe = (type: OrderBookContractType) => {
    if (socket.current) {
      socket.current.send(JSON.stringify(buildOpenMessage(FeedEvent.UNSUBSCRIBE, FeedTypes.BOOK, [type])));
    };
  }

  const subscribe = (type: OrderBookContractType) => {
    if (socket.current) {
      socket.current.send(JSON.stringify(buildOpenMessage(FeedEvent.SUBSCRIBE, FeedTypes.BOOK, [type])));
    };
  }

  const handleContractToggle = () => {
    setContractType(type => {
      unsubscribe(type);
      return type === OrderBookContractType.ETH ? OrderBookContractType.XBT : OrderBookContractType.ETH});
  }

  return (
    <div>
      <button onClick={handleContractToggle}>Toggle</button>
      <button onClick={initializeWebSocket}>initializeWebSocket</button>
      <button onClick={() => subscribe(contractType)}>subscribe</button>
      <button onClick={() => unsubscribe(contractType)}>unsubscribe</button>
    </div>
  );
}

export {
  OrderBook
}

import { useCallback, useContext, useEffect, useState } from "react";

import { buildOpenMessage, FeedEvent, FeedTypes } from "./OrderBookProps";

import { OrderBookContractType } from "../../constants/enums/OrderBookContractTypes";
import { SocketContext } from "../../WebSocket";


const OrderBook = () => {
  const { socket } = useContext(SocketContext);
  const [opened, setOpened] = useState(false);
  const [contractType, setContractType] = useState<OrderBookContractType>(OrderBookContractType.XBT);

  useEffect(() => {
    if (socket) {
      socket.addEventListener("message", messageHandler);
      socket.addEventListener("open", ()=> setOpened(true));
      socket.addEventListener("close", ()=> setOpened(false));
    }
  }, [socket]);

  const messageHandler = (message: any) => {
    console.log(message);
  };

  const unsubscribe = (type: OrderBookContractType) => {

    if (socket) {
      socket.send(JSON.stringify(buildOpenMessage(FeedEvent.UNSUBSCRIBE, FeedTypes.BOOK, [type])));
    };
  }

  const subscribe = useCallback((type: OrderBookContractType) => {
    if (socket) {
      socket.send(JSON.stringify(buildOpenMessage(FeedEvent.SUBSCRIBE, FeedTypes.BOOK, [type])));
    };
  }, [socket]);

  useEffect(() => {
    if (socket && opened) {
      subscribe(contractType)
    }
  }, [socket, opened, contractType, subscribe]);

  const handleContractToggle = () => {
    setContractType(type => {
      unsubscribe(type);
      return type === OrderBookContractType.ETH ? OrderBookContractType.XBT : OrderBookContractType.ETH});
  }

  return (
    <div>
      <button onClick={handleContractToggle}>Toggle</button>
      <button onClick={() => subscribe(contractType)}>subscribe</button>
      <button onClick={() => unsubscribe(contractType)}>unsubscribe</button>
    </div>
  );
}

export {
  OrderBook
}

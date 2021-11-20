import {
  createContext,
  ReactChild,
  ReactChildren,
  useEffect,
  useRef,
} from "react";
import { ORDER_BOOK_WS_API_URL } from "../constants/config";

export interface CustomWebSocket {
  ws: WebSocket | null;
}

const OrderBookContext = createContext<CustomWebSocket>({ ws: null });

interface SocketProviderProps {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const ws = useRef<WebSocket | null>(new WebSocket(ORDER_BOOK_WS_API_URL));

  useEffect(() => {
    const currectSocket = ws.current;
    currectSocket?.addEventListener("close", () => {
      ws.current = new WebSocket(ORDER_BOOK_WS_API_URL);
    })
    return () => {
      if (currectSocket) {
        currectSocket.close();
      }
    };
  }, [ws]);

  return (
    <OrderBookContext.Provider value={{ ws: ws.current }}>
      {children}
    </OrderBookContext.Provider>
  );
};

export { SocketProvider, OrderBookContext };

import {
  createContext,
  ReactChild,
  ReactChildren,
  useEffect,
  useRef,
} from "react";
import { ORDER_BOOK_WS_API_URL } from "../constants/config";

export interface CustomWebSocket {
  socket: WebSocket | null;
}

const SocketContext = createContext<CustomWebSocket>({ socket: null });

interface SocketProviderProps {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const socket = useRef<WebSocket | null>(new WebSocket(ORDER_BOOK_WS_API_URL));
  useEffect(() => {
    const currectSocket = socket.current;
    return () => {
      if (currectSocket) {
        currectSocket.close();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };

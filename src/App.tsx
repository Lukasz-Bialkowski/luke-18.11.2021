import { Provider } from "react-redux";
import { SocketProvider } from "./WebSocket";
import { store } from "./store";
import { OrderBook } from "./containers/OrderBook";

const App = () => (
  <Provider store={store}>
    <SocketProvider>
      <OrderBook />
    </SocketProvider>
  </Provider>
);

export default App;

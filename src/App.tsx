import { Provider as ReduxProvider } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { store } from "./store";
import { OrderBook } from "./containers/OrderBook";
import { HOME_ROUTE, ORDER_BOOK_ROUTE } from "./constants/routes";
import { Home } from "./containers/Home";
import { Nav } from "./components/Nav";
import { SocketProvider } from "./context/WebSocket";
import { Layout } from "./components/Layout";

const App = () => (
  <ReduxProvider store={store}>
    <SocketProvider>
      <Layout>
        <Nav />
        <Routes>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={ORDER_BOOK_ROUTE} element={<OrderBook />} />
        </Routes>
      </Layout>
    </SocketProvider>
  </ReduxProvider>
);

export default App;

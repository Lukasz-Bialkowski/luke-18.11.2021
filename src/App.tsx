import { Route, Routes } from "react-router-dom";

import { OrderBook } from "./containers/OrderBook";
import { HOME_ROUTE, ORDER_BOOK_ROUTE } from "./constants/routes";
import { Home } from "./containers/Home";
import { Nav } from "./components/Nav";
import { Layout } from "./components/Layout";
import "./index.css";

const App = () => (
  <Layout>
    <Nav />
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />
      <Route path={ORDER_BOOK_ROUTE} element={<OrderBook />} />
    </Routes>
  </Layout>
);

export default App;

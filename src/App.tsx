import { Navigate, Route, Routes } from "react-router-dom";

import { OrderBook } from "./containers/OrderBook";
import { ORDER_BOOK_ROUTE } from "./constants/routes";
import { Layout } from "./components/Layout";
import "./index.css";

const App = () => (
  <Layout>
    <Routes>
      <Route path={ORDER_BOOK_ROUTE} element={<OrderBook />} />
      <Route path="*" element={<Navigate to={ORDER_BOOK_ROUTE} />} />
    </Routes>
  </Layout>
);

export default App;

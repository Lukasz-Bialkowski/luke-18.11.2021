import { combineReducers } from "redux";

import { orderBookReducer } from "./orderBook";

const rootReducer = combineReducers({
  orderBook: orderBookReducer,
});

export { rootReducer };

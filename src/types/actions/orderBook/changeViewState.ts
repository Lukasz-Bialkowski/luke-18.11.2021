import { CHANGE_VIEW_STATE } from "../../../constants/actionTypes";
import { OrderBookViewConfig } from "../../reducers/orderBook";

export type ChangeViewStateAction = {
  type: typeof CHANGE_VIEW_STATE;
  payload: OrderBookViewConfig;
}

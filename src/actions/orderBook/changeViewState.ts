import { CHANGE_VIEW_STATE } from "../../constants/actionTypes";
import { ChangeViewStateAction } from "../../types/actions/orderBook/changeViewState";
import { OrderBookViewConfig } from "../../types/reducers/orderBook";

export const changeViewState = (
  newState: OrderBookViewConfig
): ChangeViewStateAction => {
  return {
    type: CHANGE_VIEW_STATE,
    payload: newState,
  };
};

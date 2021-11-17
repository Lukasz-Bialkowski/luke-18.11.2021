import {
  CHANGE_CONTRACT_TYPE,
  CHANGE_VIEW_STATE,
} from "../constants/actionTypes";
import { OrderBookContractType } from "../constants/enums/OrderBookContractTypes";
import { OrderBookReducer } from "../types/reducers/orderBook";
import { OrderBookActions } from "../types/actions/orderBook";

const initialState: OrderBookReducer = {
  viewConfig: {
    active: false,
  },
  contractType: OrderBookContractType.ETH,
};

const orderBookReducer = (
  state: OrderBookReducer = initialState,
  action: OrderBookActions
): OrderBookReducer => {
  switch (action.type) {
    case CHANGE_CONTRACT_TYPE: {
      return {
        ...state,
        contractType: action.payload.contractType,
      };
    }
    case CHANGE_VIEW_STATE: {
      return {
        ...state,
        viewConfig: {
          ...state.viewConfig,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export { orderBookReducer };

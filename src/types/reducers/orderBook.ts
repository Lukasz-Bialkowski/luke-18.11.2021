import { OrderBookContractType } from "../../constants/enums/OrderBookContractTypes";

export type OrderBookViewConfig = {
  active: boolean;
}

export type OrderBookReducer = {
  viewConfig: OrderBookViewConfig,
  contractType: OrderBookContractType,
}
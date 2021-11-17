import { CHANGE_CONTRACT_TYPE } from "../../../constants/actionTypes";
import { OrderBookContractType } from "../../../constants/enums/OrderBookContractTypes";

export type ChangeContractTypeAction = {
  type: typeof CHANGE_CONTRACT_TYPE;
  payload: {
    contractType: OrderBookContractType;
  };
};

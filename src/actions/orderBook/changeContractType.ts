import { CHANGE_CONTRACT_TYPE } from "../../constants/actionTypes"
import { OrderBookContractType } from "../../constants/enums/OrderBookContractTypes"
import { ChangeContractTypeAction } from "../../types/actions/orderBook/createRoom";

export const changeContractType = (contractType: OrderBookContractType): ChangeContractTypeAction => ({
        type: CHANGE_CONTRACT_TYPE,
        payload: {
            contractType,
        }});

import {ChangeViewStateAction} from './changeViewState';
import {ChangeContractTypeAction} from './createRoom';

export type OrderBookActions = ChangeContractTypeAction | ChangeViewStateAction;

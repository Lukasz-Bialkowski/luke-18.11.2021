import { ContractType } from "../../constants/enums/OrderBookContractTypes";

export enum FeedEvent {
  SUBSCRIBE = "subscribe",
  UNSUBSCRIBE = "unsubscribe",
}

export enum FeedTypes {
  BOOK = "book_ui_1",
}

export type FeedWelcomeMessage = {
  event: FeedEvent;
  feed: FeedTypes;
  product_ids: ContractType[];
};

export const buildOpenMessage = (
  event: FeedEvent,
  feed: FeedTypes,
  productIds: ContractType[]
): FeedWelcomeMessage => ({
  event,
  feed,
  product_ids: productIds,
});

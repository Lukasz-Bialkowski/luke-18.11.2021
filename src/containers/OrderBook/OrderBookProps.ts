import { OrderBookContractType } from "../../constants/enums/OrderBookContractTypes";

export enum FeedEvent {
  SUBSCRIBE = "subscribe",
  UNSUBSCRIBE = "unsubscribe",
};

export enum FeedTypes {
  BOOK = "book_ui_1",
}

export type FeedWelcomeMessage = {
  event: FeedEvent,
  feed: FeedTypes,
  product_ids: OrderBookContractType[],
}

export const buildOpenMessage  = (event: FeedEvent, feed: FeedTypes, productIds: OrderBookContractType[]): FeedWelcomeMessage => ({
  event,
  feed,
  product_ids: productIds,
});

import React, { useContext, useEffect, useState } from "react";
import { OrderBookContractType } from "../../constants/enums/OrderBookContractTypes";
import { SocketContext } from "../../WebSocket";

type OrderBookEntry = Record<number, { size: number, total: number }>;

const WELCOME_MESSAGE = {
  event: "subscribe",
  feed: "book_ui_1",
  product_ids: [OrderBookContractType.XBT]
};

function App2() {
  const { socket } = useContext(SocketContext);
  const [bidMatrix, setBidMatrix] = useState({});
  const [askMatrix, setAsksMatrix] = useState({});

  const openHandler = () => {
    if (socket) {
      socket.send(JSON.stringify(WELCOME_MESSAGE));
    }
  };

  const closeHandler = () => {
    console.log("closed is called");
  };

  const messageHandler =  (message: any) => {
    try {
      const jsonMessage = JSON.parse(message.data);
      
      const { bids = [], asks = [] }: { bids: [], asks: []} = jsonMessage;
      console.log('asks: ', asks);
      console.log('bids: ', bids);

      if (bids) {  
        const bidsMatrixTemp = bids.reduce((acc: any, value: [number, number]) => {
          const price = Number(value[0]);
          const size = value[1];
          const total = 0;
          return ({
            ...acc,
            [price]: { size, total }
          });
        }, {});
        
        setBidMatrix(oldBids => {
          const cumulatedBids: OrderBookEntry = ({
            ...oldBids,
            ...bidsMatrixTemp,
          });
          const sortObject = (o: any) => Object.entries(o).sort((a,b) => Number(b[0]) - Number(a[0]));
          const isSorted = sortObject(cumulatedBids);
          console.log('bid isSorted', isSorted);
          let summm = 0
          for(let [, value] of isSorted) {
            // @ts-ignore
            summm += value.size
            // @ts-ignore
            value.total = summm;
          }
          
          // @ts-ignore
          const filtered  = isSorted.filter(entry => Number(entry[1].size) > 0);
          return Object.fromEntries(filtered);
        });
      }

      if (asks) {
        const asksMatrixTemp = asks.reduce((acc: any, value: [number, number]) => {
          const price = value[0];
          const size = value[1];
          const total = 0;
          return ({
            ...acc,
            [price]: { size, total }
          });
        }, {});
        
        setAsksMatrix(oldAsks => {
          const cumulatedAsks: OrderBookEntry = ({
            ...oldAsks,
            ...asksMatrixTemp,
          })
          const sortObject = (o: any) => Object.entries(o).sort((a,b) => Number(a[0]) - Number(b[0]));
          const isSorted = sortObject(cumulatedAsks);
          console.log('ask isSorted', isSorted);
          let summm = 0
          for(let [, value] of isSorted) {
            // @ts-ignore
            summm += value.size
            // @ts-ignore
            value.total = summm;
          }
          
          // @ts-ignore
          const filtered  = isSorted.filter(entry => Number(entry[1].size) > 0);
          return Object.fromEntries(filtered);
        });
      }
      
    } catch (err) {
      console.log('Parsing error', err);
    }
  }

  useEffect(() => {
    console.log("socket", socket);
    if (socket) {
      socket.onopen = openHandler;
      socket.onmessage = messageHandler;
      socket.onclose = closeHandler;

      setTimeout(() => {
        socket.send(
          JSON.stringify({
            event: "unsubscribe",
            feed: "book_ui_1",
            product_ids: [OrderBookContractType.XBT],
          })
        );
      }, 1000);
    }
  }, [socket]);

  return (
    <div>
      {Object.entries(askMatrix).sort((a,b) => Number(a[0]) - Number(b[0])).map(item => (
      <div>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
}

export {App2};
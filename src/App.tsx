import { Suspense, useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { createApolloClient, createWSClient } from "./client";
import { QUERY_ORDERS, SUB_COUNTER } from "./data/orders-db";
import { Order } from "./ui/orders";

export function App() {
  const [orders, setOrders] = useState([]);
  const [counter, setCounter] = useState(0);
  const [client] = useState(createApolloClient());
  const [wsClient] = useState(createWSClient());
  const ordersReq = useQuery(QUERY_ORDERS, { client });
  const counterStream = useSubscription(SUB_COUNTER, { client: wsClient });

  useEffect(() => {
    if (counterStream?.data?.customer_aggregate?.aggregate?.count) {
      setCounter(counterStream?.data?.customer_aggregate?.aggregate?.count);
    }

    if (ordersReq?.data?.order) {
      setOrders(ordersReq?.data?.order);
    }
  }, [ordersReq, counterStream]);

  return (
    <div className="app">
      <Suspense fallback={<h1>Loading...</h1>}>
        <div>
          <h2>
            ({orders.length} Orders) from [{counter} cus]
          </h2>
          {orders.map((order: { product: string; purchase_price: string }) => (
            <Order name={order.product} price={order.purchase_price} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}

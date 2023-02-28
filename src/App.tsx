import get from "lodash.get";
import { Suspense, useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { createApolloClient, createWSClient } from "./client";
import { QUERY_ORDERS, SUB_COUNTER } from "./data/orders-db";
import { Loader } from "./ui/Loader";
import { OrderTitle } from "./ui/OrderTitle";
import { OrderList } from "./ui/OrderList";


const ORDER_PATH = "data.order";
const COUNT_PATH = "data.customer_aggregate.aggregate.count";

export function App() {
  const [orders, setOrders] = useState([]);
  const [counter, setCounter] = useState(0);
  const [client] = useState(createApolloClient());
  const [wsClient] = useState(createWSClient());
  const ordersReq = useQuery(QUERY_ORDERS, { client });
  const counterStream = useSubscription(SUB_COUNTER, { client: wsClient });

  useEffect(() => {
    setOrders(get(ordersReq, ORDER_PATH, []));
    setCounter(get(counterStream, COUNT_PATH, 0));
  }, [ordersReq, counterStream]);

  return (
    <Suspense fallback={<Loader />}>
      <OrderTitle size={orders.length} counter={counter} />
      <OrderList orders={orders} />
    </Suspense>
  );
}

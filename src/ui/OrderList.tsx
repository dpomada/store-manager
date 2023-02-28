import { OrderOutput } from "../data/orders-db";
import { Order } from "./Orders";

export function OrderList({ orders }: { orders: OrderOutput[] }) {
  return (
    <>
      {orders.map(({ id, product, purchase_price }: OrderOutput) => (
        <Order name={product} price={purchase_price} key={id} />
      ))}
    </>
  );
}

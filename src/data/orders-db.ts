import { gql } from "@apollo/client";

export interface OrderOutput {
  id: number;
  product: string;
  purchase_price: string;
}

export const QUERY_ORDERS = gql`
  query MyOrders {
    order(order_by: { purchase_price: asc }) {
      id
      product
      purchase_price
    }
  }
`;

export  const SUB_COUNTER = gql`
  subscription LiveCounter {
    customer_aggregate {
      aggregate {
        count
      }
    }
  }
`;
export interface OrderProps {
  name: string;
  price: string;
}

export function Order({ name, price }: OrderProps) {
  return (
    <div className="item">
      <div className="name">{name}</div>
      <div className="price">{price}</div>
    </div>
  );
}

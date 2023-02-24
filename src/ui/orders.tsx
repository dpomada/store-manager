interface OrderProps {
  name: string;
  price: string;
}

export function Order({ name, price }: OrderProps) {
  return (
    <code>
      <div>
        {name}
        <div>{price}</div>
      </div>
    </code>
  );
}

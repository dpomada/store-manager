interface OrderTitleProps {
  size: number;
  counter: number;
}

export function OrderTitle({ size, counter }: OrderTitleProps) {
  return (
    <h2>
      ({size} Orders) from [{counter} cus]
    </h2>
  );
}

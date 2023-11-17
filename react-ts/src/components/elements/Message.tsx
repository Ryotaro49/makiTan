type MessageProps = { message: string; variant: "error" | "info" };

export function Message(props: MessageProps) {
  const className =
    props.variant === "error" ? "text-red-500" : "text-blue-500";
  return <div className={className}>{props.message}</div>;
}

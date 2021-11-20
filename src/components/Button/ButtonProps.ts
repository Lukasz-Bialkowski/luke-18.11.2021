export type ButtonProps = {
  text: string;
  disabled?: boolean;
  type: "primary" | "secondary";
  onClick: () => void;
}

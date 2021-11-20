import { ButtonProps } from "./ButtonProps";
import styles from "./Button.module.css";

const Button = ({
  text,
  type = "primary",
  disabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={[
        styles.button,
        disabled ? styles.disabled : "",
        styles[`buttonType-${type}`],
      ].join(" ")}
      {...props}
    >
      {text}
    </button>
  );
};

export { Button };

import React from "react";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  text,
  children,
  onClick,
  className,
  variant = "primary",
  size = "lg",
  active = false,
  fullWidth = false,
  ...props
}) => {
  const cls = [
    styles.button,
    styles[variant],
    styles[size],
    active ? styles.active : "",
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={cls} onClick={onClick} {...props}>
      {children ?? text}
    </button>
  );
};

export default Button;

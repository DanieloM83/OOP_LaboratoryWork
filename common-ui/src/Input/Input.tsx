import type { InputProps } from "./Input.types";
import styles from "./Input.module.css";
import React from "react";

const Input: React.FC<InputProps> = ({ type, placeholder, label, className, ...rest }) => {
  if (type === "checkbox") {
    return (
      <label className={`${styles.checkbox}${className ? ` ${className}` : ""}`}>
        <input type="checkbox" className={styles.checkboxInput} {...rest} />
        <span className={styles.checkboxLabel}>{label}</span>
      </label>
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${styles.input}${className ? ` ${className}` : ""}`}
      {...rest}
    />
  );
};

export default Input;

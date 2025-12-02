import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  size?: "lg" | "sm";
  active?: boolean; // for pagination current page
  fullWidth?: boolean; // stretch to container width
  children?: React.ReactNode;
}

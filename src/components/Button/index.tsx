import React from "react";
import { useAccountContext } from "../../context/account";

interface Props {
  children: React.ReactNode;
  variant?: "button" | "link" | "outline";
  color?: "primary" | "danger";
  onclick?: () => void;
  type?: "submit" | "button";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const sizes = {
  small: 14,
  medium: 18,
  large: 22,
};

export function Button({
  children,
  disabled,
  variant = "button",
  color = "primary",
  type = "button",
  size = "medium",
  onclick,
}: Props) {
  const { account } = useAccountContext();
  const { colors } = account;

  return (
    <button
      onClick={onclick}
      type={type}
      disabled={disabled}
      style={{
        height: 48,
        padding: 10,
        backgroundColor: disabled
          ? "lightgray"
          : variant === "button"
          ? colors.primary
          : "transparent",
        color: disabled
          ? "gray"
          : color === "danger"
          ? colors.danger
          : variant === "button"
          ? "white"
          : colors.primary,
        borderRadius: 12,
        cursor: "pointer",
        fontWeight: "bold",
        border: variant === "outline" ? `2px solid ${colors.primary}` : "none",
        textDecoration: variant === "link" ? "underline" : "none",
        fontSize: sizes[size],
      }}
    >
      {children}
    </button>
  );
}

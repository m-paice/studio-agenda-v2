import React from "react";
import { useAccountContext } from "../../context/account";

interface Props {
  children: React.ReactNode;
  variant?: "button" | "link" | "outline";
  color?: "primary" | "danger";
  onclick?: () => void;
}

export function Button({
  children,
  variant = "button",
  color = "primary",
  onclick,
}: Props) {
  const { colors } = useAccountContext();

  return (
    <button
      onClick={onclick}
      style={{
        height: 48,
        padding: 10,
        backgroundColor: variant === "button" ? colors.primary : "transparent",
        color:
          color === "danger"
            ? colors.danger
            : variant === "button"
            ? "white"
            : colors.primary,
        borderRadius: 12,
        cursor: "pointer",
        fontWeight: "bold",
        border: variant === "outline" ? `2px solid ${colors.primary}` : "none",
        textDecoration: variant === "link" ? "underline" : "none",
      }}
    >
      {children}
    </button>
  );
}

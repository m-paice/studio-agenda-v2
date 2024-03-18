import React from "react";
import { useAccountContext } from "../../context/account";

interface Props {
  children: React.ReactNode;
  variant?: "button" | "link" | "outline";
  color?: "primary" | "danger";
  textSize?: "small" | "medium" | "large";
  onclick?: () => void;
}

const textSizes = {
  small: 12,
  medium: 16,
  large: 20,
};

export function Button({
  children,
  variant = "button",
  color = "primary",
  textSize = "medium",
  onclick,
}: Props) {
  const { account } = useAccountContext();
  const { colors } = account;

  return (
    <button
      onClick={onclick}
      style={{
        width: "100%",
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
        fontSize: textSizes[textSize],
        border: variant === "outline" ? `2px solid ${colors.primary}` : "none",
        textDecoration: variant === "link" ? "underline" : "none",
      }}
    >
      {children}
    </button>
  );
}

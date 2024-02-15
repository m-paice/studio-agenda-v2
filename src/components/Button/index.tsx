import React from "react";

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
  const colors = {
    primary: "#1EAFB3",
    danger: "#E5195E",
  };

  return (
    <button
      onClick={onclick}
      style={{
        height: 48,
        padding: 10,
        backgroundColor: variant === "button" ? colors[color] : "transparent",
        color: variant === "button" ? "white" : colors[color],
        borderRadius: 12,
        cursor: "pointer",
        fontWeight: "bold",
        border: variant === "outline" ? "2px solid #1EAFB3" : "none",
        textDecoration: variant === "link" ? "underline" : "none",
      }}
    >
      {children}
    </button>
  );
}

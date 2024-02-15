interface Props {
  size?: "small" | "medium" | "large";
}

export function Avatar({ size = "medium" }: Props) {
  const sizes = {
    small: 50,
    medium: 100,
    large: 150,
  };

  return (
    <div
      style={{
        width: sizes[size],
        height: sizes[size],
        backgroundColor: "#D9D9D9",
        borderRadius: "50%",
        marginBottom: 10,
      }}
    />
  );
}

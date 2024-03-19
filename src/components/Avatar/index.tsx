interface Props {
  size?: "tiny" | "small" | "medium" | "large";
  url?: string;
}

export function Avatar({ url, size = "medium" }: Props) {
  const sizes = {
    tiny: 30,
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
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

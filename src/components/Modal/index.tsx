interface Props {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, title, children }: Props) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          padding: 20,
          backgroundColor: "white",
          borderRadius: 10,
          width: 400,
        }}
      >
        <h4 style={{ textAlign: "center", marginBottom: 10 }}>
          {title.toUpperCase()}
        </h4>
        <div>{children}</div>
      </div>
    </div>
  );
}

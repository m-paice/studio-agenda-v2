export function Skeleton() {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {Array.from({ length: Math.ceil(Math.random() * 20) }).map(
          (_, index) => (
            <div key={index}>
              <div
                style={{
                  width: "100%",
                  height: 50,
                  backgroundColor: "lightgray",
                  borderRadius: 5,
                }}
              ></div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

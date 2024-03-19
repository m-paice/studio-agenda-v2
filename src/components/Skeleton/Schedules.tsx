export function SkeletonSchedules() {
  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <div
        style={{
          width: "100%",
          height: 20,
          backgroundColor: "lightgray",
          borderRadius: 5,
          marginTop: 5,
          marginBottom: 15,
        }}
      ></div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          gap: 10,
        }}
      >
        {Array.from({ length: 7 }).map((_, index) => (
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
        ))}
      </div>
    </div>
  );
}

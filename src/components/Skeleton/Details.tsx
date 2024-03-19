export function SkeletonDetails() {
  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <div
        style={{
          width: "100%",
          height: 40,
          backgroundColor: "lightgray",
          borderRadius: 5,
          marginTop: 5,
          marginBottom: 15,
        }}
      ></div>
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <div
          style={{
            width: "100%",
            height: 40,
            backgroundColor: "lightgray",
            borderRadius: 5,
            marginTop: 5,
            marginBottom: 15,
          }}
        ></div>
        <div
          style={{
            width: "100%",
            height: 40,
            backgroundColor: "lightgray",
            borderRadius: 5,
            marginTop: 5,
            marginBottom: 15,
          }}
        ></div>
      </div>
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              height: 40,
              backgroundColor: "lightgray",
              borderRadius: 5,
              marginTop: 5,
              marginBottom: 15,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

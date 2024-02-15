import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#171212",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",

          height: "300px",
        }}
      >
        <h1
          style={{
            color: "#fff",
          }}
        >
          {"Geovan Gomes".toUpperCase()}
        </h1>
        <h2
          style={{
            color: "#1EAFB3",
            letterSpacing: "4px",
            fontSize: "20px",
          }}
        >
          {"Barbeiro".toUpperCase()}
        </h2>
      </div>
      <div
        className="container"
        style={{
          maxWidth: "500px",
          backgroundColor: "#fff",

          height: "calc(100vh - 160px)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

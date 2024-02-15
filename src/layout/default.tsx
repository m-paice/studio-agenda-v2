import { Outlet } from "react-router-dom";
import { useAccountContext } from "../context/account";

export function Layout() {
  const { colors, name, type } = useAccountContext();

  return (
    <div>
      <div
        style={{
          backgroundColor: colors.background,
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
            color: colors.title,
            textAlign: "center",
          }}
        >
          {name.toUpperCase()}
        </h1>
        <h2
          style={{
            color: colors.primary,
            letterSpacing: "4px",
            fontSize: "20px",
          }}
        >
          {type.toUpperCase()}
        </h2>
      </div>
      <div
        className="container"
        style={{
          maxWidth: "500px",
          backgroundColor: "#fff",

          height: "calc(100vh - 200px)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

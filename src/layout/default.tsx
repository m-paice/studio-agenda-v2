import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useRequestFindOne } from "../hooks/useRequestFindOne";
import { Account } from "../types/home";

const accounts: { [key: string]: string } = {
  "85b71750-b509-4e2a-8727-0a79df94ab83": "barbeiro",
};

export function Layout() {
  const params = useParams<{ accountId: string }>();

  const { execute: exeAccount, response: responseAccount } =
    useRequestFindOne<Account>({
      path: `/public/account/${params.accountId}/info`,
    });

  useEffect(() => {
    exeAccount();
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: "#004A7F",
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
            textAlign: "center",
          }}
        >
          {responseAccount?.name.toUpperCase() || "Nome da conta"}
        </h1>
        <h2
          style={{
            color: "#46AAF2",
            letterSpacing: "4px",
            fontSize: "20px",
          }}
        >
          {responseAccount?.id
            ? accounts[responseAccount.id].toUpperCase()
            : "Colocar Tipo prestador"}
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

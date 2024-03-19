import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AccountProvider } from "./context/account";
import { Routes } from "./routes";

export function App() {
  return (
    <AccountProvider>
      <Routes />
      <ToastContainer />
    </AccountProvider>
  );
}

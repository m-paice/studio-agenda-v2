import { AccountProvider } from "./context/account";
import { Routes } from "./routes";

export function App() {
  return (
    <AccountProvider>
      <Routes />;
    </AccountProvider>
  );
}

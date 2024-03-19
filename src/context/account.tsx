import React, { createContext, useContext, useMemo, useState } from "react";

interface AccountContextType {
  account: AccountContext;
  setAccount: React.Dispatch<React.SetStateAction<AccountContext>>;
}
interface AccountContext {
  id: string;
  name: string;
  type: string;
  weekHours: { [key: string]: string[][] };
  days: { [key: string]: boolean };
  colors: {
    primary: string;
    background: string;
    title: string;
    selected: string;
    danger: string;
  };
}

const initialAccount: AccountContext = {
  id: "",
  name: "",
  type: "",
  weekHours: {},
  days: {},
  colors: {
    primary: "#46AAF2",
    background: "#004A7F",
    title: "#fff",
    selected: "",
    danger: "#E5195E",
  },
};

const AccountContext = createContext<AccountContextType>(
  {} as AccountContextType
);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [account, setAccount] = useState<AccountContext>(initialAccount);

  const value = useMemo(() => ({ account, setAccount }), [account, setAccount]);

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAccountContext = () => {
  const context = useContext(AccountContext);

  return context;
};

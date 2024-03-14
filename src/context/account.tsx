import React, { createContext, useContext, useEffect, useState } from "react";

interface AccountContextType {
  account: AccountContext;
  setAccount: React.Dispatch<React.SetStateAction<AccountContext>>;
}
interface AccountContext {
  id: string;
  name: string;
  type: string;
  colors: {
    primary: string;
    background: string;
    title: string;
    selected: string;
    danger: string;
  };
  services: {
    id: number;
    name: string;
    price: number;
    image: string;
  }[];
}

const initialAccount: AccountContext = {
  id: "",
  name: "",
  type: "",
  colors: {
    primary: "#46AAF2",
    background: "#004A7F",
    title: "#fff",
    selected: "",
    danger: "#E5195E",
  },
  services: [],
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [account, setAccount] = useState<AccountContext>(initialAccount);

  /*  useEffect(() => {
    setAccount(accounts[Math.floor(Math.random() * accounts.length)]);
  }, []);
 */
  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAccountContext = () => {
  const context = useContext(AccountContext);

  return context;
};

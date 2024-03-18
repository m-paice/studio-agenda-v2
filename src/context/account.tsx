import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { api } from "../services/api";

export interface Service {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface Color {
  primary: string;
  background: string;
  title: string;
  selected: string;
  danger: string;
}

export interface Days {
  dom: boolean;
  seg: boolean;
  ter: boolean;
  qua: boolean;
  qui: boolean;
  sex: boolean;
  sab: boolean;
}

interface Account {
  id: number;
  name: string;
  type: string;
  colors: Color;
  days: Days;
  services: Service[];
}
interface AccountContext {
  isLogged: boolean;
  account: Account;
  handleSetAccountId: (id: string) => void;
}

const AccountContext = createContext<AccountContext>({} as AccountContext);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [account, setAccount] = useState<Account>({
    id: 0,
    name: "Meu Petrecho",
    type: "Desenvolvedor",
    days: {
      dom: false,
      seg: false,
      ter: false,
      qua: false,
      qui: false,
      sex: false,
      sab: false,
    },

    colors: {
      primary: "#46AAF2",
      background: "#004A7F",
      title: "#fff",
      selected: "#daeefc",
      danger: "#E5195E",
    },
    services: [],
  });

  const handleSetAccountId = useCallback(async (id: string) => {
    try {
      const response = await api.get(`/public/account/${id}/info`);
      const services = await api.get(`/public/account/${id}/services`);

      if (response.data) {
        setAccount((prevState) => ({
          ...prevState,
          id: response.data.id,
          name: response.data.name,
          services: services.data ?? [],
          days: response.data.config.days,
        }));
        setIsLogged(true);

        localStorage.setItem("account", id);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const value = useMemo(
    () => ({
      account,
      isLogged,
      handleSetAccountId,
    }),
    [account, isLogged, handleSetAccountId]
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);

  return context;
};

import React, { createContext, useContext, useEffect, useState } from "react";
import { services } from "../mock/services";

interface AccountContext {
  id: number;
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

const AccountContext = createContext<AccountContext>({} as AccountContext);

const accounts = [
  {
    id: 1,
    name: "Geovan Gomes",
    type: "Barbeiro",
    colors: {
      primary: "#1EAFB3",
      background: "#171212",
      title: "#fff",
      selected: "#E8F7F7",
      danger: "#E5195E",
    },
    services: services["geovan_gomes"],
  },
  {
    id: 2,
    name: "Studio Roane Rocha",
    type: "Estética",
    colors: {
      primary: "#E51A5E",
      background: "#FFD4E3",
      title: "#E51A5E",
      selected: "#FDF5F8",
      danger: "#E5195E",
    },

    services: services["studio_roane_rocha"],
  },
  {
    id: 3,
    name: "Físio & Cia",
    type: "Fisioterapia",
    colors: {
      primary: "#46AAF2",
      background: "#004A7F",
      title: "#fff",
      selected: "#daeefc",
      danger: "#E5195E",
    },
    services: services["fisio_e_cia"],
  },
];

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [account, setAccount] = useState<AccountContext>({
    id: 0,
    name: "Meu Petrecho",
    type: "Desenvolvedor",
    colors: {
      primary: "#46AAF2",
      background: "#004A7F",
      title: "#fff",
      selected: "",
      danger: "#E5195E",
    },
    services: [],
  });

  useEffect(() => {
    setAccount(accounts[Math.floor(Math.random() * accounts.length)]);
  }, []);

  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);

  return context;
};

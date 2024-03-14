import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";

import { Avatar } from "../Avatar";
//import { Button } from "../Button";
import { useAccountContext } from "../../context/account";
import { Services } from "../../types/home";

interface Props {
  values: Services[];
  services: Services[];
  onSelect(service: Services): void;
}
export function Service({ values, services, onSelect }: Props) {
  //const navigate = useNavigate();
  const { colors } = useAccountContext();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 50px",
        height: "100%",
        padding: 10,
      }}
    >
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            overflowY: "auto",
            height: "calc(100vh - 330px)",
          }}
        >
          {services.map((item) => (
            <div
              key={item.id}
              className={
                values.some((value) => value.id === item.id) ? "selected" : ""
              }
              style={{
                width: "100%",
                height: 180,
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                transition: "all 0.3s",
                border: selectedServices.includes(parseInt(item.id))
                  ? `1px solid ${colors.primary}`
                  : "none",
                backgroundColor: selectedServices.includes(parseInt(item.id))
                  ? colors.selected
                  : "#F6F6F6",
              }}
              onClick={() => {
                onSelect(item);
                /* if (selectedServices.includes(item)) {
                  setSelectedServices(
                    selectedServices.filter((service) => service !== item)
                  );
                  return;
                }
                setSelectedServices([...selectedServices, index]); */
              }}
            >
              <p>{item.name}</p>
              <Avatar url={"Sem imagem"} />
              <p>
                {Number(item.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { useAccountContext } from "../context/account";

export function Services() {
  const navigate = useNavigate();
  const { colors, services } = useAccountContext();

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
        <p
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "gray",
            marginBottom: 10,
          }}
        >
          Para começar, selecione os serviços desejados
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            overflowY: "auto",
            height: "calc(100vh - 330px)",
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
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
                border: selectedServices.includes(index)
                  ? `1px solid ${colors.primary}`
                  : "none",
                backgroundColor: selectedServices.includes(index)
                  ? colors.selected
                  : "#F6F6F6",
              }}
              onClick={() => {
                if (selectedServices.includes(index)) {
                  setSelectedServices(
                    selectedServices.filter((service) => service !== index)
                  );
                  return;
                }
                setSelectedServices([...selectedServices, index]);
              }}
            >
              <p>{service.name}</p>
              <Avatar url={service.image} />
              <p>
                {service.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Button onclick={() => navigate("/datetime")}>
        {"Avançar".toUpperCase()}
      </Button>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";

export function Services() {
  const navigate = useNavigate();

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
            height: "calc(100vh - 280px)",
          }}
        >
          {Array.from({ length: 7 }).map((_, index) => (
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
                  ? "2px solid #1EAFB3"
                  : "none",
                backgroundColor: selectedServices.includes(index)
                  ? "#E8F7F7"
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
              <p>Barba</p>
              <Avatar />
              <p>R$ 12,00</p>
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

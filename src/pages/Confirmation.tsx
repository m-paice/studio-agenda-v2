import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { Avatar } from "../components/Avatar";

const services = [
  {
    id: 1,
    name: "Corte Social",
    price: 12.0,
    image: "/geovan_gomes/corte_social.jpeg",
  },
  {
    id: 2,
    name: "Barba",
    price: 8.0,
    image: "/geovan_gomes/barba.webp",
  },
  {
    id: 3,
    name: "Sobrançelha",
    price: 20.0,
    image: "/geovan_gomes/sobrancelha.jpeg",
  },
];

export function Confirmation() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 100px",
        height: "100%",
        padding: 10,
      }}
    >
      <div
        style={{
          height: "calc(100vh - 270px)",
          overflowY: "auto",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "gray",
            marginBottom: 10,
          }}
        >
          Confirme seus dados e agendamento
        </p>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div>
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 12,
                border: "none",
                fontSize: 16,
                marginBottom: 10,
                backgroundColor: "#F8FAFE",
              }}
            />
          </div>

          <div>
            <label>Telefone</label>
            <input
              type="text"
              placeholder="Digite seu telefone"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 12,
                border: "none",
                fontSize: 16,
                marginBottom: 10,
                backgroundColor: "#F8FAFE",
              }}
            />
          </div>
        </form>

        <div
          style={{
            marginTop: 20,
          }}
        >
          <h4>Resumo do agendamento</h4>
          <div
            style={{
              backgroundColor: "#F3F6F9",
              padding: 10,
              borderRadius: 12,
            }}
          >
            <p>12 de março de 2021 - 10:00</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <ul
            style={{
              listStyle: "none",
            }}
          >
            {services.map((service) => (
              <li
                key={service.id}
                style={{
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  padding: "3px 5px",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Avatar url={service.image} size="tiny" />
                  <p>{service.name}</p>
                </div>
                <p>
                  {service.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </li>
            ))}
          </ul>
          <h3
            style={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            Total{" "}
            {services
              .reduce((acc, service) => acc + service.price, 0)
              .toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </h3>
        </div>
      </div>

      <Button onclick={() => navigate("/finished")}>
        {"Agendar".toUpperCase()}
      </Button>
    </div>
  );
}

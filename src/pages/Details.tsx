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

export function Details() {
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
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 300px)",
          overflowY: "auto",
          paddingBottom: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            borderBottom: "1px solid #e0e0e0",
            marginBottom: 10,
          }}
        >
          <h3
            style={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            14 fevereiro, <br /> sexta-feira
          </h3>
          <h3
            style={{
              fontSize: 38,
              fontWeight: "bold",
            }}
          >
            16:00
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
            marginBottom: 10,
          }}
        >
          <div>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Matheus Paice
            </p>
            <span>14 99802-2422</span>
          </div>
          <h4>Pendente</h4>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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

        <p
          style={{
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Observações
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          <li>1. Caso não possa comparecer, cancele com antecedência.</li>
          <li>2. Chegue 10 minutos antes do horário agendado.</li>
          <li>3. Você receberá um lemebrete pelo whatsapp 1h antes.</li>
        </ul>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Button onclick={() => navigate("/")}>
          {"ir para inicio".toUpperCase()}
        </Button>

        <Button variant="link" color="danger">
          {"cancelar agendamento".toUpperCase()}
        </Button>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";

export function Confirmation() {
  const navigate = useNavigate();

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
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingLeft: 20,
          }}
        >
          <ul>
            <li>Corte social</li>
            <li>Corte social</li>
            <li>Corte social</li>
            <li>Corte social</li>
          </ul>
          <h5
            style={{
              color: "#1EAFB3",
              fontSize: 30,
            }}
          >
            R$ 30,00
          </h5>
        </div>
      </div>

      <Button onclick={() => navigate("/finished")}>
        {"Agendar".toUpperCase()}
      </Button>
    </div>
  );
}

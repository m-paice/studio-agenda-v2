import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

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
          gap: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <ul
            style={{
              listStyle: "none",
            }}
          >
            <li>Corte social</li>
            <li>Barba</li>
            <li>Barba</li>
            <li>Barba</li>
          </ul>
          <h3
            style={{
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            R$ 30,00
          </h3>
        </div>

        <p
          style={{
            color: "#858181",
            textAlign: "center",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
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

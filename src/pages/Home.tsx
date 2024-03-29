import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function Home() {
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
      <div>
        <h3>Bem-vindo ao assistente de agendamentos</h3>
        <p>Escolha uma das opções abaixo para continuar</p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Button onclick={() => navigate("/newSchedule")}>
          {"novo agendamento".toUpperCase()}
        </Button>

        <Button onclick={() => navigate("/schedules")} variant="outline">
          {"meus agendamentos".toUpperCase()}
        </Button>
      </div>
    </div>
  );
}

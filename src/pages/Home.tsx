import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { useAccountContext } from "../context/account";
import { useEffect } from "react";

export function Home() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleSetAccountId } = useAccountContext();

  useEffect(() => {
    handleSetAccountId(id!);
  }, []);

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

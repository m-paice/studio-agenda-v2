import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";

export function Home() {
  const navigate = useNavigate();

  const { accountId } = useParams<{ accountId: string }>();

  if (!accountId)
    return (
      <div
        style={{
          display: "grid",
          gridTemplateRows: "60px auto 100px",
          height: "100%",
          padding: 10,
        }}
      >
        <h4>
          Bem-vindo ao assistente de agendamentos, por favor, informe o seu ID
          para continuar
        </h4>
      </div>
    );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "60px auto 100px",
        height: "100%",
        padding: 10,
      }}
    >
      <div>
        <h3>Bem-vindo ao assistente de agendamentos</h3>
        <p>Escolha uma das opções abaixo para continuar</p>
      </div>

      <div></div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Button onclick={() => navigate(`/${accountId}/new`)}>
          {"novo agendamento".toUpperCase()}
        </Button>

        <Button
          onclick={() => navigate(`/${accountId}/schedules`)}
          variant="outline"
        >
          {"meus agendamentos".toUpperCase()}
        </Button>
      </div>
    </div>
  );
}

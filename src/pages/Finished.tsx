import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";

export function Finished() {
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
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",

          textAlign: "center",
        }}
      >
        <img src="/ok.png" alt="Agendamento concluído" />
        <p
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Agendamento concluído!
        </p>
        <p>Seu horário foi agendado com sucesso!</p>
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
        <Button variant="outline" onclick={() => navigate("/details")}>
          {"ver detalhes".toUpperCase()}
        </Button>
      </div>
    </div>
  );
}

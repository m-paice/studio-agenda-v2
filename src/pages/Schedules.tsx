import { useNavigate } from "react-router-dom";

const schedules = [
  {
    id: 1,
    date: "14 fevereiro às 16:00",
    day: "sexta-feira",
    status: "pendente",
  },
  {
    id: 2,
    date: "15 fevereiro às 16:00",
    day: "sábado",
    status: "confirmado",
  },
  {
    id: 3,
    date: "16 fevereiro às 16:00",
    day: "domingo",
    status: "confirmado",
  },
  {
    id: 4,
    date: "17 fevereiro às 16:00",
    day: "segunda-feira",
    status: "cancelado",
  },
  {
    id: 5,
    date: "18 fevereiro às 16:00",
    day: "terça-feira",
    status: "cancelado",
  },
  {
    id: 6,
    date: "19 fevereiro às 16:00",
    day: "quarta-feira",
    status: "confirmado",
  },
  {
    id: 7,
    date: "20 fevereiro às 16:00",
    day: "quinta-feira",
    status: "confirmado",
  },
];

export function Schedules() {
  const navigate = useNavigate();

  const colors: {
    [key: string]: string;
  } = {
    confirmado: "#18C07A",
    cancelado: "#E51A5E",
    pendente: "#FFC107",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "50px auto",
        height: "100%",
        padding: 10,
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
        Selecione o agendamento desejado
      </p>
      <div
        style={{
          overflowY: "auto",
          height: "calc(100vh - 270px)",
        }}
      >
        {schedules.map((schedule, index) => (
          <div
            onClick={() => navigate(`/details`)}
            key={schedule.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: index % 2 === 0 ? "#F6F6F6" : "transparent",
              padding: 10,
              cursor: "pointer",
            }}
          >
            <div>
              <p>{schedule.date}</p>
              <span
                style={{
                  color: "#876370",
                }}
              >
                {schedule.day}
              </span>
            </div>
            <span
              style={{
                color: colors[schedule.status],
              }}
            >
              {schedule.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

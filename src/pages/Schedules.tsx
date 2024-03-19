import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import { Button } from "../components/Button";
import { useRequestFindMany } from "../hooks/useRequestFindMany";
import { SkeletonSchedules } from "../components/Skeleton/Schedules";

interface Schedules {
  id: string;
  scheduleAt: Date;
  status: string;
  createdAt: Date;
}

const colors: {
  [key: string]: string;
} = {
  finished: "#18C07A",
  canceled: "#E51A5E",
  pending: "#FFC107",
};

const status: {
  [key: string]: string;
} = {
  finished: "Finalizado",
  canceled: "Cancelado",
  pending: "Pendente",
};

export function Schedules() {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();

  const {
    execute: execSchedules,
    response: responseSchedules,
    loading: loadingSchedules,
  } = useRequestFindMany<Schedules>({
    path: `/public/account/${accountId}/schedules`,
    defaultQuery: {
      where: {
        userId: localStorage.getItem("userId"),
      },
      limit: 5,
    },
  });

  useEffect(() => {
    execSchedules();
  }, []);

  if (loadingSchedules) {
    return <SkeletonSchedules />;
  }

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
          height: "calc(100vh - 320px)",
        }}
      >
        {(responseSchedules || [])
          .sort((a, b) => {
            if (a.createdAt > b.createdAt) {
              return -1;
            }
            if (a.createdAt < b.createdAt) {
              return 1;
            }
            return 0;
          })
          .map((schedule, index) => (
            <div
              onClick={() => navigate(`/${accountId}/${schedule.id}/details`)}
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
                <p>
                  {dayjs(schedule.scheduleAt).format("DD MMMM YYYY [às] HH:mm")}
                </p>
                <span
                  style={{
                    color: "#876370",
                  }}
                >
                  {dayjs(schedule.scheduleAt).format("dddd")}
                </span>
              </div>
              <span
                style={{
                  color: colors[schedule.status] || "black",
                }}
              >
                {status[schedule.status] || schedule.status}
              </span>
            </div>
          ))}
      </div>
      <Button onclick={() => navigate(`/${accountId}`)}>
        {"voltar".toUpperCase()}
      </Button>
    </div>
  );
}

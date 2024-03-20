import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import { Button } from "../components/Button";
import { Avatar } from "../components/Avatar";
import { Modal } from "../components/Modal";
import { SkeletonDetails } from "../components/Skeleton/Details";
import { useRequestFindOne } from "../hooks/useRequestFindOne";
import { useRequestDestroy } from "../hooks/useRequestDestroy";
import { useToggle } from "../hooks/useToggle";

interface Schedule {
  id: string;
  scheduleAt: Date;
  status: string;
  services: {
    id: string;
    name: string;
    price: number;
    image?: string;
  }[];
  user: {
    name: string;
    cellPhone: string;
  };
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

export function Details() {
  const navigate = useNavigate();
  const { accountId, scheduleId } = useParams<{
    accountId: string;
    scheduleId: string;
  }>();

  const { onChangeToggle, toggle } = useToggle();

  const {
    execute: exeSchedule,
    response: responseSchedule,
    loading,
  } = useRequestFindOne<Schedule>({
    path: `/public/schedule/details/${scheduleId}`,
  });

  const {
    execute: destroy,
    loading: loadingDestroy,
    error: errorCanceled,
  } = useRequestDestroy({
    path: `/public/schedule/cancel/${scheduleId}`,
    callbackSuccess: () => {
      navigate(`/${accountId}`);
    },
  });

  useEffect(() => {
    if (scheduleId) {
      exeSchedule();
    }
  }, [scheduleId]);

  useEffect(() => {
    if (errorCanceled) {
      toast.error(
        "Você não pode cancenlar o agendamento 1h antes do horário. Entre em contato com o estabelecimento."
      );
    }
  }, [errorCanceled]);

  const handleCancel = () => {
    destroy();
    onChangeToggle();
  };

  if (loading) {
    return <SkeletonDetails />;
  }

  if (!responseSchedule) {
    return <h1>Agendamento não encontrado</h1>;
  }

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
          height: "calc(100vh - 315px)",
          overflowY: "auto",
          paddingRight: 10,
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
            {/* 14 fevereiro, <br /> sexta-feira */}
            {dayjs(responseSchedule.scheduleAt).format("DD MMMM")}, <br />
            {dayjs(responseSchedule.scheduleAt).format("dddd")}
          </h3>
          <h3
            style={{
              fontSize: 38,
              fontWeight: "bold",
            }}
          >
            {dayjs(responseSchedule.scheduleAt).format("HH:mm")}
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // borderBottom: "1px solid #e0e0e0",
            marginBottom: 40,
          }}
        >
          <div>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {responseSchedule.user.name}
            </p>
            <span>
              {responseSchedule.user.cellPhone.replace(
                /(\d{2})(\d{5})(\d{4})/,
                "($1) $2-$3"
              )}
            </span>
          </div>
          <h4
            style={{
              color: colors[responseSchedule.status] || "black",
            }}
          >
            {status[responseSchedule.status]}
          </h4>
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
            {responseSchedule.services.map((service, index) => (
              <li
                key={index}
                style={{
                  borderBottom: "1px solid #e0e0e0",
                  padding: "10px 0",
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
                  <Avatar url={service.image || ""} size="tiny" />
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
            {responseSchedule.services
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
          <li>3. Você receberá um lembrete pelo whatsapp 1h antes.</li>
        </ul>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {responseSchedule.status === "pending" && (
          <Button
            disabled={loadingDestroy}
            onclick={onChangeToggle}
            variant="link"
            color="danger"
          >
            {"cancelar agendamento".toUpperCase()}
          </Button>
        )}
        <Button onclick={() => navigate(`/${accountId}`)}>
          {"ir para inicio".toUpperCase()}
        </Button>
      </div>

      <Modal isOpen={toggle} title="Cancelamento">
        <p>
          Deseja cancelar esse agendamento? <br /> Seu horário será liberado
          para outro cliente.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginTop: 20,
          }}
        >
          <Button onclick={onChangeToggle}>{"não".toUpperCase()}</Button>
          <Button
            disabled={loadingDestroy}
            variant="outline"
            onclick={handleCancel}
          >
            {"sim".toUpperCase()}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

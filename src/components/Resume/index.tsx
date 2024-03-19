import dayjs from "dayjs";
import { Servicing } from "../../types/home";
import { Avatar } from "../Avatar";

interface Props {
  services: Servicing[];
  selectedDate: Date;
  selectedTime: string;
}

export function Resume({ services, selectedDate, selectedTime }: Props) {
  return (
    <div>
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
          <p>
            {dayjs(selectedDate).format("DD [de] MMMM [de] YYYY")} às{" "}
            {selectedTime}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: 20,
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
                padding: "3px 5px",
                borderBottom: "1px solid #D9D9D9",
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
    </div>
  );
}

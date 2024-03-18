import { useState } from "react";

import { useAccountContext } from "../context/account";
import dayjs from "dayjs";

const times = Array.from({ length: 25 }, (_, index) => {
  const hour = index < 10 ? `0${index}` : index.toString();
  return `${hour}:00`;
});

const currentDayOfWeek = dayjs().day();

export function DateTime() {
  const { account } = useAccountContext();
  const { colors, days } = account;

  console.log("days", days);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <div>
      <div>
        <p
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "gray",
            marginBottom: 10,
          }}
        >
          Selecione a data e horario {currentDayOfWeek}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 10,
            borderBottom: "1px solid #ccc",
            padding: "10px 0",
          }}
        >
          {Array.from({ length: 7 }).map((date, index) => {
            const dayShortName = dayjs()
              .add(currentDayOfWeek - 1 + index, "day")
              .format("ddd");

            const dayShortNameFormated = dayShortName
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            return (
              <div
                key={index}
                style={{
                  display: !days[dayShortNameFormated] ? "none" : "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  padding: "10px 15px",
                  borderRadius: 20,
                  transition: "0.3s",
                  backgroundColor:
                    selectedDate === index.toString()
                      ? colors.primary
                      : "white",
                  color: selectedDate === index.toString() ? "white" : "black",
                }}
                onClick={() => setSelectedDate(index.toString())}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {dayjs().add(index, "day").format("DD")}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color:
                      selectedDate === index.toString() ? "white" : "#8A96BC",
                  }}
                >
                  {dayjs()
                    .add(currentDayOfWeek - 1 + index, "day")
                    .format("ddd")}
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: `repeat(${times.length / 3}, 1fr)`,
            gap: 10,
          }}
        >
          {times.map((time) => (
            <div
              key={time}
              style={{
                border:
                  selectedTime === time
                    ? "none"
                    : `1px solid ${colors.primary}`,
                backgroundColor:
                  selectedTime === time ? colors.primary : "white",
                borderRadius: 10,
                color: selectedTime === time ? "white" : colors.primary,
                textAlign: "center",
                padding: 10,
                transition: "0.3s",
                cursor: "pointer",
                height: 50,
              }}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

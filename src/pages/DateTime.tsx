import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { useAccountContext } from "../context/account";

const dates = [
  {
    day: "19",
    weekDay: "SEG",
  },
  // {
  //   day: "13",
  //   weekDay: "TER",
  // },
  {
    day: "14",
    weekDay: "QUA",
  },
  {
    day: "15",
    weekDay: "QUI",
  },
  {
    day: "16",
    weekDay: "SEX",
  },
  {
    day: "17",
    weekDay: "SAB",
  },
  // {
  //   day: "18",
  //   weekDay: "DOM",
  // },
];

const times = Array.from({ length: 25 }, (_, index) => {
  const hour = index < 10 ? `0${index}` : index.toString();
  return `${hour}:00`;
});

export function DateTime() {
  const navigate = useNavigate();
  const { colors } = useAccountContext();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 50px",
        height: "100%",
        padding: 10,
      }}
    >
      <div>
        <p
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "gray",
            marginBottom: 10,
          }}
        >
          Selecione a data e horario
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
          {dates.map((date) => (
            <div
              key={date.day}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                border: "1px solid #ccc",
                padding: "10px 15px",
                borderRadius: 20,
                transition: "0.3s",
                backgroundColor:
                  selectedDate === date.day ? colors.primary : "white",
                color: selectedDate === date.day ? "white" : "black",
              }}
              onClick={() => setSelectedDate(date.day)}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {date.day}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: selectedDate === date.day ? "white" : "#8A96BC",
                }}
              >
                {date.weekDay}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: `repeat(${times.length / 3}, 1fr)`,
            gap: 10,
            overflowY: "auto",
            height: `calc(100vh - 420px)`,
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

      <Button onclick={() => navigate("/confirmation")}>
        {"Avançar".toUpperCase()}
      </Button>
    </div>
  );
}

import { useState } from "react";
import { TimeSlotsItem } from "../../hooks/useTimeSlots";
import { isCurrentTimeBefore } from "../../utils/currentimeBefore";
import { useAccountContext } from "../../context/account";

interface Props {
  items: TimeSlotsItem[];
  value?: string;
  onSelect(item: string): void;
  schedulesWithUserName: {
    time: string;
    cellPhone: string;
    id: string;
  }[];
  daySelected?: Date;
}

export function Hours({
  items,
  value,
  onSelect,
  daySelected,
  schedulesWithUserName,
}: Props) {
  const [selectedTime, setSelectedTime] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <p style={{ fontWeight: "bold" }}>Horários disponíveis</p>
      <span style={{ fontSize: 14, color: "gray" }}>
        Os horários disponíveis são de acordo com o dia selecionado
      </span>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: `repeat(${items.length / 3}, 1fr)`,
          gap: 10,
          overflowY: "auto",
          height: `calc(100vh - 480px)`,
        }}
      >
        {items.map((item) => {
          const selectHour = schedulesWithUserName.find(
            (hourItem) => hourItem.time === item.time
          );
          console.log("selectHour ===>", selectHour);
          const meSchedule =
            selectHour &&
            localStorage.getItem("cellPhone")?.replace(/\D/g, "") ===
              selectHour.cellPhone;

          if (!daySelected) {
            console.error("Day Selected não pode ser indefinido");
            return false;
          }

          const result =
            daySelected > new Date() ? true : isCurrentTimeBefore(item.time);

          return (
            <button
              key={item.time}
              type="button"
              className={
                meSchedule
                  ? "meSchedule"
                  : item.schedule
                  ? "danger"
                  : item.time === value
                  ? "success"
                  : !result
                  ? "notScheduled"
                  : ""
              }
              onClick={() => {
                if (!item.schedule && result) onSelect(item.time);
                if (meSchedule && selectHour) {
                  // salvar o id do agendamento que o usuario clicou
                  onSelect(selectHour.id);
                  console.log("Select hour.id ==> ", selectHour.id);
                }
                setSelectedTime(item.time);
                console.log("Item.time ==> ", item.time);
              }}
              style={{
                border:
                  selectedTime === item.time ? "none" : `1px solid #46AAF2`,
                backgroundColor:
                  selectedTime === item.time ? "#46AAF2" : "white",
                borderRadius: 10,
                color: selectedTime === item.time ? "white" : "#46AAF2",
                textAlign: "center",
                padding: 10,
                transition: "0.3s",
                cursor: "pointer",
                height: 50,
              }}
            >
              {item.time} <br />
            </button>
          );
        })}
      </div>
    </div>
  );
}

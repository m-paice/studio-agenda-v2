import dayjs from "dayjs";
import { useAccountContext } from "../../../context/account";

interface Props {
  selectedDate: Date;
  setSelectedDate(date: Date): void;
}

export function Days({ selectedDate, setSelectedDate }: Props) {
  const { account } = useAccountContext();
  const { colors, days } = account;

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
          Selecione a data e horario
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 10,
            padding: "10px 0",
          }}
        >
          {Array.from({ length: 7 }).map((_, index) => {
            const date = dayjs().add(index, "day").format("DD");
            const dayWeek = dayjs().add(index, "day").format("dddd");
            const daySelected = dayjs(selectedDate).format("DD");

            return (
              <div
                key={date}
                style={{
                  display: days[
                    dayWeek
                      .slice(0, 3)
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLocaleLowerCase()
                  ]
                    ? "flex"
                    : "none",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  padding: "10px 15px",
                  borderRadius: 20,
                  transition: "0.3s",
                  backgroundColor:
                    daySelected === date ? colors.primary : "white",
                  color: daySelected === date ? "white" : "black",
                }}
                onClick={() =>
                  setSelectedDate(dayjs().add(index, "day").toDate())
                }
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {date}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: daySelected == date ? "white" : "#8A96BC",
                  }}
                >
                  {dayWeek.slice(0, 3).toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import dayjs from "dayjs";
import { useAccountContext } from "../../../context/account";
import { FormikErrors } from "formik";
import { FieldsValues } from "../../../pages/NewSchedule";
import { Skeleton } from "./Skeleton";

interface Props {
  loadingSchedules: boolean;
  timesScheduled: string[];
  selectedDate: Date;
  selectedTime: string;
  setSelectedTime(time: string): void;
  errors: FormikErrors<FieldsValues>;
}

function createIntervals(timeString: string) {
  const [startTime, endTime] = timeString.split(" - ");
  const intervals: string[] = [];

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  let totalStartMinutes = startHour * 60 + startMinute;
  const totalEndMinutes = endHour * 60 + endMinute;

  while (totalStartMinutes <= totalEndMinutes) {
    const hours = Math.floor(totalStartMinutes / 60);
    const minutes = totalStartMinutes % 60;
    intervals.push(
      `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    );
    totalStartMinutes += 30;
  }

  return intervals;
}

export function Hours({
  loadingSchedules,
  errors,
  timesScheduled,
  selectedDate,
  selectedTime,
  setSelectedTime,
}: Props) {
  const { account } = useAccountContext();
  const { colors, days } = account;

  const dayWeek = dayjs(selectedDate).format("dddd");

  const dayEnable =
    days[
      dayWeek
        .slice(0, 3)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase()
    ];

  if (!dayEnable) {
    return (
      <div
        style={{
          color: colors.primary,
          textAlign: "center",
        }}
      >
        Esse estabelecimento não atende hoje! Por favor, selecione outro dia.
      </div>
    );
  }

  if (loadingSchedules) {
    return <Skeleton />;
  }

  const daySelected = dayjs(selectedDate)
    .format("dddd")
    .slice(0, 3)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  const times = account.weekHours[daySelected]
    ? account.weekHours[daySelected]
        .map((time) => createIntervals(time.join(" - ")))
        .flat()
        .filter((time) => {
          const isBefore = dayjs(selectedDate)
            .set("hour", Number(time.split(":")[0]))
            .set("minute", Number(time.split(":")[1]))
            .isBefore(dayjs());
          return !timesScheduled.includes(time) && !isBefore;
        })
    : [];

  if (times.length === 0) {
    return (
      <div
        style={{
          color: colors.primary,
          textAlign: "center",
          // padding: 10,
        }}
      >
        selecione um dia
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {times.map((time) => (
          <div
            key={time}
            style={{
              border:
                selectedTime === time ? "none" : `1px solid ${colors.primary}`,
              backgroundColor: selectedTime === time ? colors.primary : "white",
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
      <p
        style={{
          color: "red",
          textAlign: "center",
        }}
      >
        {errors?.time ? <span>{errors.time}</span> : null}
      </p>
    </div>
  );
}

import { useEffect, createContext, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { Button } from "../components/Button";
import { useAccountContext } from "../context/account";
import { Account, DayNames, Fields, Schedules } from "../types/home";
import {
  endOfDay,
  format,
  getDay,
  setHours,
  setMinutes,
  startOfDay,
} from "date-fns";
import { useFormik } from "formik";
import { handleTimeSlots } from "../hooks/useTimeSlots";
import { Hours } from "../components/Hours";
import { transformTime } from "../hooks/useTransformTime";
import { useRequestCreate } from "../hooks/useRequestCreate";
import { useRequestFindMany } from "../hooks/useRequestFindMany";
import { useRequestFindOne } from "../hooks/useRequestFindOne";
import { Days } from "../components/Days";

const daysOfWeek: DayNames[] = [
  "DOMINGO",
  "SEGUNDA-FEIRA",
  "TERÇA-FEIRA",
  "QUARTA-FEIRA",
  "QUINTA-FEIRA",
  "SEXTA-FEIRA",
  "SABADO",
];

interface DateTimeContextType {
  selectedDateTime: Date | null;
  setSelectedDateTime: (dateTime: Date) => void;
}

export function DateTime() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  //const { colors } = useAccountContext();

  const validationSchema = Yup.object({
    date: Yup.string().required("Selecione uma data"),
    hour: Yup.string().required("Selecione um horário"),
  });

  const formik = useFormik<Fields>({
    initialValues: {
      date: new Date(),
      hour: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.date && values.hour) {
        const [hour, minute] = values.hour.split(":");
        const scheduleAt = new Date(
          format(
            setMinutes(setHours(values.date, Number(hour)), Number(minute)),
            "YYYY/MM/dd HH:mm:ss"
          )
        );

        const payload = { scheduleAt };
        execCreateDateTime(payload);
        toast.success("Data e horário selecionado com sucesso");
      } else {
        // Trate o caso em que values.hour é undefined
        console.error("A propriedade 'hour' está indefinida.");
      }
    },
  });

  const {
    execute: execCreateDateTime,
    //loading: loadingCreateDateTime,
    response: responseCreateDateTime,
  } = useRequestCreate({ path: `/public/account/${id}/datetime` });

  const {
    response: responseSchedules,
    //loading: loadingSchedules,
    //execute: execSchedules,
  } = useRequestFindMany<Schedules>({
    path: `/public/account/${id}/schedules`,
    defaultQuery: {
      where: {
        scheduleAt: {
          $between: [
            startOfDay(formik.values.date),
            endOfDay(formik.values.date),
          ],
        },
      },
    },
  });

  const {
    execute: execAccount,
    response: responseAccount,
    //loading: loadingAccount,
  } = useRequestFindOne<Account>({
    path: "/public/account",
    id: `${id}/info`,
  });

  useEffect(() => {
    if (responseCreateDateTime) {
      formik.resetForm();
    }
  }, [responseCreateDateTime]);

  useEffect(() => {
    execAccount();
  }, []);

  const daySelected = formik?.values?.date
    ? getDay(formik.values.date)
    : getDay(new Date());

  const dayWeek: DayNames = daysOfWeek[daySelected];

  const enableDay: { [key: string]: boolean } =
    responseAccount?.config?.days || {};

  const hours = responseAccount?.config?.weekHours?.[dayWeek] || [];

  const schedulesWithUserName = (responseSchedules || []).map((item) => ({
    time: format(new Date(item.scheduleAt), "HH:mm"),
    cellPhone: item.user.cellPhone,
    id: item.id,
  }));

  const slots = hours.map((item) => {
    const [startAt, endAt] = item;

    const startTime = transformTime({ time: startAt });
    const endTime = transformTime({ time: endAt });

    const schedulesHours = (responseSchedules || []).map((item) => ({
      scheduleAt: format(new Date(item.scheduleAt), "HH:mm"),
      averageTime: item.averageTime,
    }));

    const { timeSlots } = handleTimeSlots({
      payload: schedulesHours,
      startAt: startTime,
      endAt: endTime,
    });

    return timeSlots;
  });

  const timeDataSlots =
    Array.isArray(slots) && slots.length ? [...slots[0], ...slots[1]] : [];

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
            borderBottom: "1px solid #ccc",
            padding: "10px 0",
          }}
        >
          <Days
            daysOfWeek={daysOfWeek}
            enableDays={enableDay}
            formik={formik}
          />
        </div>

        <Hours
          items={timeDataSlots}
          value={formik?.values.hour}
          onSelect={(item) => formik?.setFieldValue("hour", item)}
          schedulesWithUserName={schedulesWithUserName}
          daySelected={formik?.values.date}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "50px",
        }}
      >
        <Button onclick={() => navigate(`/public/account/${id}/confirmation`)}>
          {"Avançar".toUpperCase()}
        </Button>
      </div>
    </div>
  );
}

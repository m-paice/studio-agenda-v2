import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import * as Yup from "yup";

import { Account, Schedules, Servicing } from "../types/home";
import { useAccountContext } from "../context/account";
import { useRequestFindMany } from "../hooks/useRequestFindMany";
import { useRequestFindOne } from "../hooks/useRequestFindOne";
import { useRequestCreate } from "../hooks/useRequestCreate";
import { Services } from "../components/Services";
import { Resume } from "../components/Resume";
import { Button } from "../components/Button";
import { UserInfo } from "../components/UserInfo";
import { Days } from "../components/DateTime/Days";
import { Hours } from "../components/DateTime/Hours";

export interface FieldsValues {
  services: Servicing[];
  date: Date;
  time: string;
  name: string;
  cellPhone: string;
}

const initialValues = {
  services: [],
  date: new Date(),
  time: "",
  name: "",
  cellPhone: "",
};

const validationSchema = Yup.object({
  services: Yup.array()
    .of(Yup.object().required())
    .min(1, "Selecione pelo menos um serviço"),
  date: Yup.date().required("Data é obrigatória"),
  time: Yup.string().required("Selecione um horário"),
  name: Yup.string().required("Nome é obrigatório"),
  cellPhone: Yup.string().required("Telefone é obrigatório"),
});

export function NewSchedule() {
  const navigate = useNavigate();

  const { accountId } = useParams<{ accountId: string }>();
  const { account, setAccount } = useAccountContext();

  const { setFieldValue, handleSubmit, values, errors, touched, handleBlur } =
    useFormik<FieldsValues>({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        const [hour, minute] = values.time.split(":");
        const scheduleAt = dayjs(values.date)
          .set("hour", Number(hour))
          .set("minute", Number(minute))
          .set("second", 0)
          .toISOString();

        const payload = {
          shortName: values.name,
          cellPhone: values.cellPhone.replace(/\D/g, ""),
          services: values.services.map((service) => ({
            id: service.id,
            isPackage: false,
          })),
          scheduleAt,
          averageTime: values.services.reduce(
            (total, service) => total + parseFloat(service.averageTime || "0"),
            0
          ),
        };

        execCreateSchedules(payload);
      },
    });

  const {
    execute: execCreateSchedules,
    response: responseCreated,
    loading: loadingCreateSchedule,
  } = useRequestCreate<{ id: string; userId: string }>({
    path: `/public/account/${accountId}/schedules`,
  });

  const {
    execute: execServices,
    response: responseServices,
    loading: loadingServices,
  } = useRequestFindMany<Servicing>({
    path: `/public/account/${accountId}/services`,
  });

  const {
    execute: execSchedules,
    response: responseSchedules,
    loading: loadingSchedules,
  } = useRequestFindMany<Schedules>({
    path: `/public/account/${accountId}/schedules`,
    defaultQuery: {
      where: {
        scheduleAt: {
          $between: [
            dayjs(values.date).startOf("day").toISOString(),
            dayjs(values.date).endOf("day").toISOString(),
          ],
        },
        status: "pending",
      },
    },
  });

  const { execute: exeAccount, response: responseAccount } =
    useRequestFindOne<Account>({
      path: `/public/account/${accountId}/info`,
    });

  useEffect(() => {
    if (responseCreated) {
      localStorage.setItem("userId", responseCreated.userId);
      navigate(`/${accountId}/${responseCreated.id}/finished`);
    }
  }, [responseCreated]);

  useEffect(() => {
    if (accountId) {
      exeAccount();
      execServices();
    }
  }, []);

  useEffect(() => {
    if (responseAccount) {
      setAccount({
        ...account,
        weekHours: Object.entries(responseAccount.config.weekHours).reduce<{
          [key: string]: string[][];
        }>((acc, cur) => {
          const [key, value] = cur;
          acc[
            key
              .slice(0, 3)
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toUpperCase()
          ] = value;
          return acc;
        }, {}),
        days: responseAccount.config.days,
      });
    }
  }, [responseAccount]);

  useEffect(() => {
    if (values.date) {
      execSchedules();
      setFieldValue("time", "");
    }
  }, [values.date]);

  useEffect(() => {
    // verifica se o serviço tem mais de 30 minutos e se tem agendamento no proximo horario
    if (values.time) {
      const [hour, minute] = values.time.split(":");

      if (values.services.length <= 1) return;

      const hasNextSchedule = dayjs(values.date)
        .set("hour", Number(hour))
        .set("minute", Number(minute))
        .add(30, "minute")
        .format("HH:mm");

      if (
        responseSchedules?.some(
          (item) => dayjs(item.scheduleAt).format("HH:mm") === hasNextSchedule
        )
      ) {
        toast.warning(
          "Não é possível agendar mais de um serviço para esse horário, pois o próximo horário já está ocupado."
        );
        setFieldValue("time", "");
      }
    }
  }, [values.time, values.services]);

  return (
    <div
      style={{
        padding: 10,
        overflowY: "auto",
        height: "calc(100vh - 200px)",
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
        onSubmit={handleSubmit}
      >
        <Services
          loadingServices={loadingServices}
          services={responseServices || []}
          selectedServices={values.services}
          handleClick={(item) => {
            if (values.services.includes(item)) {
              setFieldValue(
                "services",
                values.services.filter((service) => service !== item)
              );
            } else {
              setFieldValue("services", [...values.services, item]);
            }
          }}
          errors={errors}
        />

        <Days
          selectedDate={values.date}
          setSelectedDate={(date) => setFieldValue("date", date)}
        />
        <Hours
          loadingSchedules={loadingSchedules}
          timesScheduled={
            responseSchedules
              ?.map((item) => {
                const timeAttended = Math.ceil(item.averageTime / 30);
                if (timeAttended > 1) {
                  return Array.from({ length: timeAttended }, (_, i) =>
                    dayjs(item.scheduleAt)
                      .add(i * 30, "minute")
                      .format("HH:mm")
                  );
                }
                return dayjs(item.scheduleAt).format("HH:mm");
              })
              .flat() || []
          }
          selectedDate={values.date}
          selectedTime={values.time}
          setSelectedTime={(time) => setFieldValue("time", time)}
          errors={errors}
        />
        <UserInfo
          values={{
            name: values.name,
            cellPhone: values.cellPhone,
          }}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          handleBlur={handleBlur}
        />
        <Resume
          services={values.services}
          selectedDate={values.date}
          selectedTime={values.time}
        />
        <Button
          type="submit"
          disabled={loadingCreateSchedule || Object.keys(errors).length > 0}
        >
          {"Agendar".toUpperCase()}
        </Button>
        {errors && Object.keys(errors).length > 0 && (
          <div
            style={{
              color: "red",
              textAlign: "center",
            }}
          >
            você precisa preencher todos os <br />
            campos obrigatórios (
            {Object.keys(errors)
              .map((item) => {
                const keys: { [key: string]: string } = {
                  services: "serviços",
                  date: "data",
                  time: "horário",
                  name: "nome",
                  cellPhone: "telefone",
                };
                return keys[item];
              })
              .join(", ")}
            )
          </div>
        )}
      </form>
    </div>
  );
}

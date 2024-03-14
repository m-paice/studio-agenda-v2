import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/Button";

import { Servicing, Fields, Account } from "../types/home";
import { useRequestFindMany } from "../hooks/useRequestFindMany";
import { useFormik } from "formik";
import { Service } from "../components/Service";
import { useRequestFindOne } from "../hooks/useRequestFindOne";

export function Services() {
  const navigate = useNavigate();
  //const params = useParams<{ id: string }>();
  const { id } = useParams<{ id: string }>();

  const [selectedServices, setSelectedServices] = useState<Servicing[]>([]);

  const {
    execute: exeAccount,
    response: responseAccount,
    loading: loadingAccount,
  } = useRequestFindOne<Account>({
    path: "/public/account",
    id: `${id}/info`,
  });
  const {
    execute: execServices,
    response: responseServices,
    //loading: loadingServices,
  } = useRequestFindMany<Servicing>({
    path: `/public/account/${id}/services`,
  });

  useEffect(() => {
    execServices();
    exeAccount();
  }, []);

  return (
    <div
      style={{
        // display: "grid",
        gridTemplateRows: "auto 50px",
        height: "98%",
        padding: 10,
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: 16,
          color: "gray",
          marginTop: 5,
          marginBottom: 15,
        }}
      >
        Para começar, selecione os serviços desejados
      </p>
      <div>
        <Service
          values={selectedServices}
          services={responseServices || []}
          onSelect={(service) => {
            const isSelected = selectedServices.some(
              (item) => item.id === service.id
            );
            if (isSelected) {
              const updatedServices = selectedServices.filter(
                (item) => item.id !== service.id
              );
              setSelectedServices(updatedServices);
            } else {
              setSelectedServices([...selectedServices, service]);
            }
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Button onclick={() => navigate(`/public/account/${id}/datetime`)}>
          {"Avançar".toUpperCase()}
        </Button>
      </div>
    </div>
  );
}

import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { useRequestFindOne } from "../hooks/useRequestFindOne";
import { Account, Servicing } from "../types/home";
import { useEffect, useState } from "react";
import { useRequestFindMany } from "../hooks/useRequestFindMany";
import { Service } from "../components/Service";
import { useAccountContext } from "../context/account";

export function Home() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [selectedServices, setSelectedServices] = useState<Servicing[]>([]);

  const { execute: exeAccount } = useRequestFindOne<Account>({
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
  }, [id]);

  const account = useAccountContext();
  //console.log("account: ", account);

  return (
    <div
      style={{
        // display: "grid",
        gridTemplateRows: "auto 100px",
        height: "30%",
        padding: 10,
      }}
    >
      <div>
        <h3>Bem-vindo ao assistente de agendamentos</h3>
        <p>Escolha uma das opções abaixo para continuar</p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          //paddingBottom: "20px",
        }}
      >
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
          display: "grid",
          gap: 5,
        }}
      >
        <Button onclick={() => navigate(`/public/account/${id}/services`)}>
          {"novo agendamento".toUpperCase()}
        </Button>

        <Button
          onclick={() => navigate(`/public/account/${id}/schedules`)}
          variant="outline"
        >
          {"meus agendamentos".toUpperCase()}
        </Button>
      </div>
    </div>
  );
}

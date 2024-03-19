import { FormikErrors } from "formik";
import { Servicing } from "../../types/home";
import { ServiceItem } from "./ServiceItem";
import { FieldsValues } from "../../pages/NewSchedule";
import { Skeleton } from "./Skeleton";

interface Props {
  services: Servicing[];
  handleClick(id: Servicing): void;
  selectedServices: Servicing[];
  errors: FormikErrors<FieldsValues>;
  loadingServices: boolean;
}

export function Services({
  errors,
  services,
  selectedServices,
  loadingServices,
  handleClick,
}: Props) {
  if (loadingServices) {
    return <Skeleton />;
  }

  return (
    <div>
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
        }}
      >
        {services.map((item) => (
          <ServiceItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            selected={selectedServices.some(
              (service) => service.id === item.id
            )}
            handleClick={() => handleClick(item)}
          />
        ))}
      </div>
      <p
        style={{
          color: "red",
          textAlign: "center",
        }}
      >
        {errors?.services ? <span>{errors.services.toString()}</span> : null}
      </p>
    </div>
  );
}

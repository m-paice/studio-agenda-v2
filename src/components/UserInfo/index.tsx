import { FormikErrors, FormikTouched } from "formik";
import { maskTextCellPhone } from "../../hooks/maskText";
import { FieldsValues } from "../../pages/NewSchedule";

interface Props {
  values: {
    name: string;
    cellPhone: string;
  };
  errors: FormikErrors<FieldsValues>;
  touched: FormikTouched<FieldsValues>;
  setFieldValue: (field: string, value: string) => void;
  handleBlur(event: React.FocusEvent<unknown>): void;
}

export function UserInfo({
  errors,
  touched,
  values,
  setFieldValue,
  handleBlur,
}: Props) {
  return (
    <div>
      <p
        style={{
          textAlign: "center",
          fontSize: 16,
          color: "gray",
        }}
      >
        Confirme seus dados e agendamento
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div>
          <label>Nome</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={values.name}
            onChange={(e) => setFieldValue("name", e.target.value)}
            onBlur={handleBlur}
            name="name"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 5,
              border: "none",
              fontSize: 16,

              backgroundColor: "#F8FAFE",
            }}
          />
          <p
            style={{
              color: "red",
            }}
          >
            {errors?.name && touched?.name ? <span>{errors.name}</span> : null}
          </p>
        </div>

        <div>
          <label>Telefone</label>
          <input
            type="text"
            placeholder="Digite seu telefone"
            value={values.cellPhone}
            name="cellPhone"
            onChange={(e) =>
              setFieldValue("cellPhone", maskTextCellPhone(e.target.value))
            }
            onBlur={handleBlur}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 5,
              border: "none",
              fontSize: 16,

              backgroundColor: "#F8FAFE",
            }}
          />
          <p
            style={{
              color: "red",
            }}
          >
            {errors?.cellPhone && touched?.cellPhone ? (
              <span>{errors.cellPhone}</span>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}

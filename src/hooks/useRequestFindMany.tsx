import { useState } from "react";
import { getApi } from "../services/api";

interface Props {
  path: string;
  defaultQuery?: object;
}

/* interface RequestResponse {
  data: unknown; // Tipo de dados esperado em sua resposta
} */

interface ErrorResponse {
  response: {
    status: number;
  };
}

/* interface UseRequestFindManyResponse {
  execute: (params?: Record<string, unknown>) => void;
  response: unknown; // Tipo de dados esperado em sua resposta
  error: boolean | null;
  loading: boolean | undefined;
} */

export function useRequestFindMany<T>({ path, defaultQuery = {} }: Props) {
  const [response, setResponse] = useState<T[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const execute = (params = {}) => {
    setLoading(true);

    getApi()
      .get(path, {
        params: {
          ...defaultQuery,
          ...params,
        },
      })
      .then(({ data }) => {
        setResponse(data);

        setError(false);
        setLoading(false);
      })
      .catch((err: ErrorResponse) => {
        if (err.response.status === 401) setResponse(null);

        setError(true);
        setLoading(false);
      });
  };

  return {
    execute,
    response,
    error,
    loading,
  };
}

import { useState } from "react";
import { getApi } from "../services/api";

interface Props {
  path: string;
  id: string;
  defaultQuery?: object;
}

export function useRequestFindOne<T>({ path, id, defaultQuery = {} }: Props) {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const execute = (params = {}) => {
    setLoading(true);

    getApi()
      .get(`${path}/${id}`, {
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
      .catch(() => {
        setResponse(null);

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

import { useState } from "react";

import { getApi } from "../services/api";

interface Props {
  path: string;
  callbackSuccess?: () => void;
}

export function useRequestDestroy({ path, callbackSuccess }: Props) {
  const [response, setResponse] = useState<boolean | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const execute = () => {
    setLoading(true);
    setError(false);

    getApi()
      .delete(path)
      .then(() => {
        if (callbackSuccess) callbackSuccess();
        setResponse(true);

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

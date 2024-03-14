import { useState, useCallback, useEffect } from "react";

type AsyncFunction<T> = (...args: unknown[]) => Promise<T>;

type Status = "idle" | "pending" | "success" | "error";

/* interface AsyncState<T> {
  status: Status;
  value: T | null;
  error: any;
} */

export function useAsync<T>(
  asyncFunction: AsyncFunction<T>,
  ...initialParams: unknown[]
) {
  const [status, setStatus] = useState<Status>("idle");
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  const handleResetStatus = () => {
    setStatus("idle");
  };

  const execute = useCallback(
    async (...execParams: unknown[]) => {
      setStatus("pending");
      setValue(null);
      setError(null);

      const params = execParams.length ? execParams : initialParams;

      try {
        const response = await asyncFunction(...params);
        setValue(response);
        setStatus("success");
      } catch (e) {
        setError(e);
        setStatus("error");
      }
    },
    [asyncFunction, initialParams]
  );

  useEffect(() => {
    return () => {
      handleResetStatus();
    };
  }, []);

  return { execute, handleResetStatus, status, value, error } as const;
}

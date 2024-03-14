import React, { ReactNode, createContext, useContext, useState } from "react";

interface DateTimeData {
  selectedDateTime: Date | null;
  setSelectedDateTime: (dateTime: Date) => void;
}

const DateTimeContext = createContext<DateTimeData | undefined>(undefined);

export const DateTimeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  return (
    <DateTimeContext.Provider value={{ selectedDateTime, setSelectedDateTime }}>
      {children}
    </DateTimeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDateTime = () => {
  const context = useContext(DateTimeContext);
  if (!context) {
    throw new Error("useDateTime must be used within a DateTimeProvider");
  }
  return context;
};

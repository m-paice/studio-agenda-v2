export type DayNames =
  | "DOMINGO"
  | "SEGUNDA-FEIRA"
  | "TERÇA-FEIRA"
  | "QUARTA-FEIRA"
  | "QUINTA-FEIRA"
  | "SEXTA-FEIRA"
  | "SABADO";

export interface Account {
  id: string;
  name: string;
  type: string;
  config: {
    startAt: string;
    endAt: string;
    days: {
      dom: boolean;
      seg: boolean;
      ter: boolean;
      qua: boolean;
      qui: boolean;
      sex: boolean;
      sab: boolean;
    };
    weekHours: { [key: string]: string[][] };
  };
}
export interface Servicing {
  id: string;
  name: string;
  price: number;
  averageTime: string;
  image?: string;
}

export interface Schedules {
  id: string;
  scheduleAt: string;
  shortName: string;
  user: { name: string; cellPhone: string };
  averageTime: number;
  status: string;
}

export interface Fields {
  name?: string;
  cellPhone?: string;
  date?: Date;
  services?: Servicing[];
  hour?: string;
}

import axios from "axios";
import qs from "qs";

export const api = axios.create({
  baseURL: "https://api.meupetrecho.com.br/api/v1",
  paramsSerializer: (params) => qs.stringify(params),
});

import axios from "axios";
import qs from "qs";

const host = {
  production: "https://api.meupetrecho.com.br",
};

//const token = () => localStorage.getItem("token");

export function getApi() {
  return axios.create({
    baseURL: `${host.production}/api/v1`,
    paramsSerializer: (params) => qs.stringify(params),
    /*  headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }, */
  });
}

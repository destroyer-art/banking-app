import axios from "axios";

import { getToken } from "../auth/auth";

export const getAxiosInstance = () => {
  const axiosConfig: any = {
    baseURL: "http://localhost:3000/api/",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const authToken = getToken();

  if (authToken) {
    axiosConfig.headers["Authorization"] = `Bearer ${authToken}`;
  }

  return axios.create(axiosConfig);
};

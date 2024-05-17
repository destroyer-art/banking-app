import axios from "axios";

export const getAxiosInstance = () => {
  const axiosConfig: any = {
    baseURL: "http://localhost:3000/api/",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const authToken = getToken();

  console.log({ authToken });

  if (authToken) {
    axiosConfig.headers["Authorization"] = `Bearer ${authToken}`;
  }

  return axios.create(axiosConfig);
};

export const getToken = () => {
  return localStorage.getItem("auth_token");
};

export const setToken = (token: string) => {
  return localStorage.setItem("auth_token", token);
};

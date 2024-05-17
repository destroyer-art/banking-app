 import { setToken } from "../auth/auth";
import { AlertStatus, LoginInput } from "../types/types";
import { getAxiosInstance } from "./axios-instance";
import { fetchCustomer } from "./fetch-customer";

export const login = async (payload: LoginInput, setNotification: any) => {
  try {
    const { data: token } = await getAxiosInstance().post("login", payload);

    setToken(token);

    await fetchCustomer()

    setNotification({
      message: "Succesfully Logged In...",
      status: AlertStatus.SUCCESS,
    });
  } catch (error: any) {
    const errorMessage = error.response.data || "Failed to login";
    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};

 import { setToken } from "../auth/auth";
import { AlertStatus, LoginInput } from "../types/types";
import { getAxiosInstance } from "./axios-instance";

export const login = async (payload: LoginInput, setNotification: any) => {
  try {
    const { data: token } = await getAxiosInstance().post("login", payload);

    setToken(token);

    setNotification({
      message: "Succesfully Logged In...",
      status: AlertStatus.SUCCESS,
    });
  } catch (error: any) {
    const errorMessage = error.response.data || "Failed to login";
    console.log({ error });
    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};

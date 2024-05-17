import { AlertStatus, LoginInput } from "../types/types";
import { getAxiosInstance, setToken } from "./axios-instance";
// import { useHistory } from "react-router-dom";

export const login = async (payload: LoginInput, setNotification: any) => {
  try {
    const { data: token } = await getAxiosInstance().post("login", payload);

    setToken(token);
    // useHistory.push("/");
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

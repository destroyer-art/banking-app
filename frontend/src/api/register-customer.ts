import { AlertStatus, RegisterInput } from "../types/types";
import { getAxiosInstance } from "./axios-instance";

export const registerCustomer = async (
  payload: RegisterInput,
  setNotification: any
) => {
  try {
    const { data: message } = await getAxiosInstance().post(
      "customers",
      payload
    );

    setNotification({ message: message, status: AlertStatus.SUCCESS });
  } catch (error: any) {
    const errorMessage = error.response.data || "Failed to register";
    console.log({ error });
    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};

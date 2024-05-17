import { AlertStatus, RegisterInput } from "../types/types";
import { getAxiosInstance } from "./axios-instance";

export const registerCustomer = async (
  payload: RegisterInput,
  setNotification: any
) => {
  try {
    const { data } = await getAxiosInstance().post("customers", payload);

    setNotification({ message: data, status: AlertStatus.SUCCESS });
  } catch (error: any) {
    let errorMessage = "";

    if (error.response.data?.message) {
      errorMessage = error.response.data.message;
    } else {
      errorMessage = error.response.data || "Failed to register";
    }
    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};

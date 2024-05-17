import { AlertStatus, RefundInput } from "../types/types";
import { getAxiosInstance } from "./axios-instance";

export const refund = async (payload: RefundInput, setNotification: any) => {
  try {
    const { data } = await getAxiosInstance().post("refund", payload);

    setNotification({
      message: JSON.stringify(data),
      status: AlertStatus.SUCCESS,
    });
  } catch (error: any) {
    const errorMessage = error.response.data || "Failed to refund";
    console.log({ error });
    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};

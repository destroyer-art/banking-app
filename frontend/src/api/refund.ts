import { AlertStatus, RefundInput } from "../types/types";
import { getAxiosInstance } from "./axios-instance";
import { fetchCustomer } from "./fetch-customer";

export const refund = async (payload: RefundInput, setNotification: any) => {
  try {
    const { data } = await getAxiosInstance().post("refund", payload);

    await fetchCustomer();

    setNotification({
      message: JSON.stringify(data),
      status: AlertStatus.SUCCESS,
    });
  } catch (error: any) {
    let errorMessage = "";

    if (error.response.data?.message) {
      errorMessage = error.response.data.message;
    } else {
      errorMessage = error.response.data || "Failed to refund";
    }
    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};

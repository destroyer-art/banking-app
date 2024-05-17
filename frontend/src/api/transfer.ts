import { AlertStatus, TransferInput } from "../types/types";
import { getAxiosInstance } from "./axios-instance";
import { fetchCustomer } from "./fetch-customer";

export const transfer = async (
  payload: TransferInput,
  setNotification: any
) => {
  try {
    const { data } = await getAxiosInstance().post("transfer", payload);

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
      errorMessage = error.response.data || "Failed to transfer";
    }
    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};

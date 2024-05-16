import { AlertStatus, TransferInput } from "../types/types";
import { axiosInstance } from "./axios-instance";
import { fetchCustomer } from "./fetch-customer";

export const transfer = async (
  payload: TransferInput,
  setNotification: any
) => {
  try {
    const { data } = await axiosInstance.post("transfer", payload);

    console.log({ data });

    await fetchCustomer(payload.customerId);

    setNotification({
      message: JSON.stringify(data),
      status: AlertStatus.SUCCESS,
    });
  } catch (error: any) {
    const errorMessage = error.response.data || "Failed to transfer";
    console.log({ error });
    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};

import { AlertStatus, PurchaseInput } from "../types/types";
import { getAxiosInstance } from "./axios-instance";
import { fetchCustomer } from "./fetch-customer";

export const purchase = async (
  payload: PurchaseInput,
  setNotification: any
) => {
  try {
    const { data } = await getAxiosInstance().post("purchase", payload);

    await fetchCustomer(payload.customerId);

    setNotification({ message: JSON.stringify(data), status: AlertStatus.SUCCESS });
  } catch (error: any) {
    const errorMessage = error.response.data || "Failed to puchase";
    console.log({ error });
    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};

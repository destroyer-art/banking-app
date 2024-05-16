import { AlertStatus, TopUPInput } from "../types/types";
import { axiosInstance } from "./axios-instance";
import { fetchCustomer } from "./fetch-customer";

// Example usage in a React component
export const topUpBalance = async (
  payload: TopUPInput,
  setNotification: any
) => {
  try {
    const { data } = await axiosInstance.post("top-up", payload);

    await fetchCustomer(payload.customerId);

    setNotification({ message: JSON.stringify(data), status: AlertStatus.SUCCESS });
  } catch (error: any) {
    const errorMessage = error.response.data || "Failed to top up balance";
    console.log({ error });
    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};

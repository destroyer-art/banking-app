import { AlertStatus, TopUPInput } from "../types/types";
import { getAxiosInstance } from "./axios-instance";
import { fetchCustomer } from "./fetch-customer";

// Example usage in a React component
export const topUpBalance = async (
  payload: TopUPInput,
  setNotification: any
) => {
  try {
    const { data } = await getAxiosInstance().post("top-up", payload);

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
      errorMessage = error.response.data || "Failed to top up balance";
    }
    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};

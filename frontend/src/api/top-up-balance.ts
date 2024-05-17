import { AlertStatus, TopUPInput } from "../types/types";
import { getAxiosInstance } from "./axios-instance";

// Example usage in a React component
export const topUpBalance = async (
  payload: TopUPInput,
  setNotification: any
) => {
  try {
    const { data } = await getAxiosInstance().post("top-up", payload);

    setNotification({
      message: JSON.stringify(data),
      status: AlertStatus.SUCCESS,
    });
  } catch (error: any) {
    const errorMessage = error.response.data || "Failed to top up balance";
    console.log({ error });
    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};

import { setCustomerData } from "../auth/auth";
import { getAxiosInstance } from "./axios-instance";

export const fetchCustomer = async () => {
  try {
    const { data } = await getAxiosInstance().get(`customers`);
    setCustomerData(data);
  } catch (error: any) {
    let errorMessage = "";

    if (error.response.data?.message) {
      errorMessage = error.response.data.message;
    } else {
      errorMessage = error.response.data || "Failed to fetchCustomer";
    }
    throw new Error(errorMessage);
  }
};
 
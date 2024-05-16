import { axiosInstance } from "./axios-instance";
import Cookies from "js-cookie";

export const fetchCustomer = async (customerId: string) => {
  try {
    const { data } = await axiosInstance.get(`customers/${customerId}`);

    setCustomerData(data);
  } catch (error: any) {
    const errorMessage = error.response.data || "Failed to fetch Customer";
    console.log({ error });
    throw new Error(errorMessage);
  }
};

export const setCustomerData = (data: any) => {
  let user = Cookies.get("customerData");

  if (user) {
    Cookies.remove("customerData");
  }

  Cookies.set("customerData", JSON.stringify(data));
};

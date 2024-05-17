import Cookies from "js-cookie";
import { AlertStatus, RegisterInput } from "../types/types";
import { getAxiosInstance } from "./axios-instance";
import { fetchCustomer } from "./fetch-customer";

export const registerCustomer = async (
  payload: RegisterInput,
  setNotification: any
) => {
  try {
    const { data } = await getAxiosInstance().post("customers", payload);

    const customerId = data.split("ID: ")[1];

    await fetchCustomer(customerId);

    Cookies.set("customerId", customerId);

    setNotification({ message: data, status: AlertStatus.SUCCESS });
  } catch (error: any) {
    const errorMessage = error.response.data || "Failed to register";
    console.log({ error });
    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};

export const getCustomerId = () => {
  return Cookies.get("customerId");
};

export const getCustomerData = () => {
  let user = Cookies.get("customerData");

  if (user) {
    user = JSON.parse(user);
  }

  return user;
};

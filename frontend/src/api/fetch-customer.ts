import { getAxiosInstance } from "./axios-instance";

export const fetchCustomer = async () => {
  try {
    const { data } = await getAxiosInstance().get(`customers`);
    console.log({ data });
  } catch (error: any) {
    const errorMessage = error.response.data || "Failed to fetch Customer";
    console.log({ error });
    throw new Error(errorMessage);
  }
};

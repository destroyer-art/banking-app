import { CustomerOutput, JwtPayload } from "../types/types";
import { jwtDecode } from "jwt-decode";

export const JWT_SECRET = "HBOIU0i09mIU2@n[09";

export const getToken = () => {
  return localStorage.getItem("auth_token");
};

export const setToken = (token: string) => {
  if (localStorage.getItem("auth_token")) {
    localStorage.removeItem("auth_token");
  }
  localStorage.setItem("auth_token", token);
};

export const getCurrentCustomer = (): JwtPayload | null => {
  const token: string | null = getToken();
  if (token) {
    return jwtDecode(`${token}`) as JwtPayload;
  } else {
    return null;
  }
};

export const setCustomerData = (customer: any): void => {
  if (localStorage.getItem("customer_data")) {
    localStorage.removeItem("customer_data");
  }
  localStorage.setItem("customer_data", JSON.stringify(customer));
};

export const getCustomerData = (): CustomerOutput | null => {
  const data: string | null = localStorage.getItem("customer_data");

  if (data) {
    return JSON.parse(data) as CustomerOutput;
  } else {
    return null;
  }
};

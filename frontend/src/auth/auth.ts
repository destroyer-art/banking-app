import { JwtPayload } from "../types/types";
import { jwtDecode } from "jwt-decode";

export const JWT_SECRET = "HBOIU0i09mIU2@n[09";

export const getToken = () => {
  return localStorage.getItem("auth_token");
};

export const setToken = (token: string) => {
  const tokenn = localStorage.setItem("auth_token", token);
  console.log({ token, tokenn });

  return tokenn;
};

export const getCurrentCustomer = (): JwtPayload | null => {
  const token: string | null = getToken();
  if (token) {
    const payload = jwtDecode(`${token}`) as JwtPayload;
    console.log({ payload });
    return payload;
  } else {
    return null;
  }
};

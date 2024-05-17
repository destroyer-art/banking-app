import { JwtPayload } from "../types/jwt-payload";
const JWT = require("jsonwebtoken");  

export const JWT_SECRET = "HBOIU0i09mIU2@n[09";

export const generateJwtTokenAsync = (payload: JwtPayload): string => {
  return JWT.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const decodeJwtToken = (token: string): JwtPayload => {
  return JWT.verify(token, JWT_SECRET) as JwtPayload;
};

import { compare } from "bcryptjs";
import { Customer } from "../../customer/domain/models/customer.model";
import { ErrorMessages } from "../../shared/constants/error-messages";
import { JwtPayload } from "../types/jwt-payload";
import JWT from "jsonwebtoken";

export const JWT_SECRET = "HBOIU0i09mIU2@n[09";

export const generateJwtTokenAsync = (payload: JwtPayload): string => {
  return JWT.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const decodeJwtToken = (token: string): JwtPayload => {
  return JWT.verify(token, JWT_SECRET) as JwtPayload;
};

export const checkValidations = async (
  password: string,
  customer: Customer
): Promise<string> => {
  let errorMessage = "";

  if (!customer) {
    errorMessage = ErrorMessages.EMAIL_OR_PASSWORD_IS_INCORRECT;
  }

  if (!customer.emailVerified) {
    errorMessage = ErrorMessages.EMAIL_IS_NOT_VERIFIED;
  }
  const isPasswordValid = await compare(password, customer.password);

  if (!isPasswordValid) {
    errorMessage = ErrorMessages.EMAIL_OR_PASSWORD_IS_INCORRECT;
  }

  return errorMessage;
};

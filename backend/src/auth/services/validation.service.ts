import { ErrorMessages } from "../../transaction/services/helper";
import { Customer } from "../../customer/domain/models/customer.model";
import { compare } from "bcryptjs";

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

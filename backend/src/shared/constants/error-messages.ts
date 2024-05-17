import { ResponseToolkit } from "@hapi/hapi";
import { Transaction } from "../../transaction/domain/models/transaction.model";
import { TransactionOutput } from "../../transaction/types/transaction-output";

export enum ErrorMessages {
  CUSTOMER_NOT_FOUND = "CUSTOMER not found!",
  INSUFFICENT_BALANCE = "Insufficient Balance!",
  GSM_NUmber_NOT_FOUND = "No Customer for this GSM Number!",
  CAN_NOT_SEND_TO_YOURSELF = "This is your GSM Number! Can not send to yourself!",
  CUSTOMER_ALREADY_EXIST = "Customer has already exist!",
  EMAIL_ALREADY_EXIST = "Email has already exist!",
  GSM_NUMBER_ALREADY_EXIST = "Gsm Number has already exist!",
  EMAIL_OR_PASSWORD_IS_INCORRECT = "Email or password is incorrect!",
  EMAIL_IS_NOT_VERIFIED = "Email is not verified!",
  ALREADY_REFUNDED = "Already Refunded",
  TRANSACTION_NOT_FOUND = "Transaction not found!",
  TOKEN_NOT_FOUND_IN_HEADERS = "Token not found in headers!",
  TOKEN_VERIFICATION_ERROR = "Token verification error!",
  TOO_MANY_REQUESTS = "Too many requests... Please try again later!",
}
 
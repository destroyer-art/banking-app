import { ResponseToolkit } from "@hapi/hapi";
import { Transaction } from "../domain/models/transaction.model";
import { TransactionOutput } from "../types/transaction-output";

export enum ErrorMessages {
  CUSTOMER_NOT_FOUND = "CUSTOMER not found!",
  INSUFFICENT_BALANCE = "Insufficient Balance!",
  GSM_NUmber_NOT_FOUND = "No Customer for this GSM Number!",
  CAN_NOT_SEND_TO_YOURSELF = "This is your GSM Number! Can not send to yourself!",
  CUSTOMER_ALREADY_EXIST = "Customer has already exist!",
  ALREADY_REFOUNDED = "Already Refunded",
  TRANSACTION_NOT_FOUND = "Transaction not found!",
}

export const makePayment = async () => {
  // Payment Gateway Logic ...
  return { status: true };
};

export const getTransactionByNumber = async (
  number: string,
  queryRunner: any
) => {
  return await queryRunner.manager.findOne(Transaction, { where: { number } });
};

export const sendResponse = async (
  transaction: Transaction,
  h: ResponseToolkit
) => {
  const response: TransactionOutput = {
    date: transaction.createdAt,
    amount: transaction.amount,
    operation: transaction.type,
    status: transaction.status,
    transactionNumber: transaction.number,
  };

  return h.response(response).code(200);
};

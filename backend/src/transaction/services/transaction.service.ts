import { ResponseToolkit } from "@hapi/hapi";
import { Transaction } from "../../transaction/domain/models/transaction.model";
import { TransactionOutput } from "../../transaction/types/transaction-output";

export const makePayment = async () => {
  // Payment Gateway Logic ...
  return { status: true };
};

export const getTransactionByNumber = async (
  number: string,
  queryRunner: any
): Promise<Transaction> => {
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

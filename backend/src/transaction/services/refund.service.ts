import { Request, ResponseToolkit } from "@hapi/hapi";
import { Customer } from "../../customer/domain/models/customer.model";
import { appDataSource } from "../../db/database";
import { TransactionStatus } from "../domain/enums/transaction-status";
import { TransactionType } from "../domain/enums/transaction-type";
import { Transaction } from "../domain/models/transaction.model";
import { RefundInput } from "../types/refund-input";
import {
  ErrorMessages,
  getTransactionByNumber,
  makePayment,
  sendResponse,
} from "./helper";

/*
*********** REFUND LOGIC *********** 
1) Find Current Customer (User who triggered the refund) based on Customer ID
2) Find Purchased Transaction based on Transaction Number (This is not Transaction ID, it is Transaction Number)
3) Create a new Transaction with PENDING status
4) Update Transaction Status based on Payment Status
5) top UP Customer balance
6) Send Transaction Information to the end user about current operation
*/

export const refund = async (request: Request, h: ResponseToolkit) => {
  const queryRunner = appDataSource.createQueryRunner();

  try {
    const { transactionNumber } = request.payload as RefundInput;

    const customerId = request.auth["customer"].id;

    const customer = await queryRunner.manager.findOne(Customer, {
      where: { id: customerId },
    });

    if (!customer) {
      return h.response(ErrorMessages.CUSTOMER_NOT_FOUND).code(404);
    }

    const purchasedTransaction: Transaction = await getTransactionByNumber(
      transactionNumber,
      queryRunner
    );

    if (!purchasedTransaction) {
      return h.response(ErrorMessages.TRANSACTION_NOT_FOUND).code(404);
    }

    if (purchasedTransaction.status === TransactionStatus.RETURNED) {
      return h.response(ErrorMessages.ALREADY_REFOUNDED).code(400);
    }

    purchasedTransaction.status = TransactionStatus.RETURNED;

    // Create Pending Transaction
    const newTransaction = await queryRunner.manager.save(Transaction, {
      number: purchasedTransaction.number, // Purchase and refund Transactions will have SAME number
      targetId: customer.id, // Customer ID
      sourceId: purchasedTransaction.targetId, // Shopping Provider ID
      amount: purchasedTransaction.amount,
      type: TransactionType.REFUND,
    });

    // Make Payment
    const payment = await makePayment();

    //  Update Purchased Transaction Status
    await queryRunner.manager.save(Transaction, purchasedTransaction);

    // Update Transaction Status
    newTransaction.status = payment.status
      ? TransactionStatus.COMPLETED
      : TransactionStatus.FAILED;

    // Update Current Transaction
    const transaction: Transaction = await queryRunner.manager.save(
      Transaction,
      newTransaction
    );

    // Update Customer Balance
    customer.balance = customer.balance + purchasedTransaction.amount;

    await queryRunner.manager.save(Customer, customer);

    // Send Response to the end User about Opearion
    return sendResponse(transaction, h);
  } catch (error) {
    console.error("Error processing refund:", error);
    return h.response("Error processing refund").code(500);
  }
};

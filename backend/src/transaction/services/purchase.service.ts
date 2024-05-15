import { Request, ResponseToolkit } from "@hapi/hapi";
import { Customer } from "../../customer/domain/models/customer.model";
import { appDataSource } from "../../db/database";
import { TransactionStatus } from "../domain/enums/transaction-status";
import { TransactionType } from "../domain/enums/transaction-type";
import { Transaction } from "../domain/models/transaction.model";
import { ErrorMessages, makePayment, sendResponse } from "./helper";
import { PurchaseInput } from "../types/purchase-input";

export const purchase = async (request: Request, h: ResponseToolkit) => {
  const queryRunner = appDataSource.createQueryRunner();

  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { customerId, amount, shoppingProvider } =
      request.payload as PurchaseInput;

    const customer = await queryRunner.manager.findOne(Customer, {
      where: { id: customerId },
    });

    if (!customer) {
      return h.response(ErrorMessages.CUSTOMER_NOT_FOUND).code(404);
    }

    if (customer.balance < amount) {
      return h.response(ErrorMessages.INSUFFICENT_BALANCE).code(400);
    }

    // Create Pending Transaction
    const newTransaction = await queryRunner.manager.save(Transaction, {
      targetId: shoppingProvider, // Shopping Provider ID
      sourceId: customer.id, // Customer ID
      type: TransactionType.PURCHASE,
      amount,
    });

    // Make Payment
    const payment = await makePayment();

    // Update Transaction Status
    newTransaction.status = payment.status
      ? TransactionStatus.COMPLETED
      : TransactionStatus.FAILED;

    // Update Transaction
    const transaction = await queryRunner.manager.save(
      Transaction,
      newTransaction
    );

    // Update Customer Balance
    customer.balance = customer.balance - amount;
    await queryRunner.manager.save(Customer, customer);

    await queryRunner.commitTransaction();

    // Send Response to the end User about Operation
    return sendResponse(transaction, h);
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("Error processing Purchase:", error);
    return h.response("Error processing Purchase").code(500);
  } finally {
    await queryRunner.release();
  }
};

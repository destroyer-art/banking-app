import { Request, ResponseToolkit } from "@hapi/hapi";
import { Customer } from "../../customer/domain/models/customer.model";
import { appDataSource } from "../../db/database";
import { TransactionStatus } from "../domain/enums/transaction-status";
import { TransactionType } from "../domain/enums/transaction-type";
import { Transaction } from "../domain/models/transaction.model";
import { TopUpInput } from "../types/top-up-input";
import { makePayment, sendResponse } from "./transaction.service";

/*

********************** TOP UP LOGIC ********************** 
1. Start the transaction
2. fetch the customer id from the Token
3. create a new transaction with the type TOP_UP with PENDING Status
4. make a payment (Integration with Payment Provider)
5. update the transaction status based on the payment status
6. update the customer balance (+ Amount)
7. commit the transaction
8. send the Response to the end user
9. handle the errors and rollback the transaction if any error occurs

*/

export const topUp = async (request: Request, h: ResponseToolkit) => {
  const queryRunner = appDataSource.createQueryRunner();

  try {

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { amount, paymentProvider } = request.payload as TopUpInput;

    const customerId = request.auth["customer"].id;

    const customer = await queryRunner.manager.findOne(Customer, {
      where: { id: customerId },
    });

    // Create Pending Transaction
    const currentRansaction = await queryRunner.manager.save(Transaction, {
      targetId: customer.id, // Customer ID
      sourceId: paymentProvider, // Payment Provider ID
      type: TransactionType.TOP_UP,
      amount,
    });

    // Make Payment
    const payment = await makePayment();

    // Update Transaction Status
    currentRansaction.status = payment.status
      ? TransactionStatus.COMPLETED
      : TransactionStatus.FAILED;

    // Update Transaction in DB
    const transaction: Transaction = await queryRunner.manager.save(
      Transaction,
      currentRansaction
    );

    // Update Customer Balance
    customer.balance = customer.balance + amount;
    await queryRunner.manager.save(Customer, customer);

    await queryRunner.commitTransaction();

    // Send Response to the end User about Opearion
    return sendResponse(transaction, h);
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("Error processing Top-up:", error);
    return h.response("Error processing Top-up").code(500);
  }finally {
    await queryRunner.release();
  }
};

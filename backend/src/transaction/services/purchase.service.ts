import { Request, ResponseToolkit } from "@hapi/hapi";
import { Customer } from "../../customer/domain/models/customer.model";
import { appDataSource } from "../../db/database";
import { TransactionStatus } from "../domain/enums/transaction-status";
import { TransactionType } from "../domain/enums/transaction-type";
import { Transaction } from "../domain/models/transaction.model";
import { ErrorMessages } from "../../shared/constants/error-messages";
import { makePayment, sendResponse } from "./transaction.service";
import { PurchaseInput } from "../types/purchase-input";

/*

********************** PURCHASE LOGIC ********************** 
1. Start the transaction
2. fetch the customer id from the Token
3. check if the customer has enough balance and if not return INSUFFICENT_BALANCE error
4. create a new transaction with the type PURCHASE with PENDING Status
5. make a payment (Integration with Payment Provider)
6. update the transaction status based on the payment status
7. update the customer balance (- Amount)
8. commit the transaction
9. send the Response to the end user
10. handle the errors and rollback the transaction if any error occurs

*/

export const purchase = async (request: Request, h: ResponseToolkit) => {
  const queryRunner = appDataSource.createQueryRunner();

  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { amount, shoppingProvider } = request.payload as PurchaseInput;

    const customerId = request.auth["customer"].id;

    const customer = await queryRunner.manager.findOne(Customer, {
      where: { id: customerId },
    });
 

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

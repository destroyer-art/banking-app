import { appDataSource } from "../../db/database";
import { Customer } from "../../customer/domain/models/customer.model";
import { TransactionStatus } from "../domain/enums/transaction-status";
import { TransactionType } from "../domain/enums/transaction-type";
import { Transaction } from "../domain/models/transaction.model";
import { TransferInput } from "../types/transfer-input";
import { ErrorMessages } from "../../shared/constants/error-messages";
import { makePayment, sendResponse } from "./transaction.service";
import { QueryRunner } from "typeorm";

/*

********************** TRANSFER LOGIC ********************** 

1.  Start the transaction
2.  fetch the customer id from the Token
3.  fetch the target customer by GSM Number
4.  check if the customer has enough balance and if not return INSUFFICENT_BALANCE error
5.  check if the target customer exists and if not return GSM_NUmber_NOT_FOUND error
6.  check if the target customer is the same as the current customer and if yes return CAN_NOT_SEND_TO_YOURSELF error
7.  create a new transaction with the type TRANSFER with PENDING Status
8.  make a payment (Integration with Payment Provider)
9.  update the transaction status based on the payment status
10. update the customer balance (- Amount)
11. update the target customer balance (+ Amount)
12. commit the transaction
13. send the Response to the end user
14. handle the errors and rollback the transaction if any error occurs

*/

export const transfer = async (request, h) => {
  const queryRunner: QueryRunner = appDataSource.createQueryRunner();

  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { amount, targetGSMNumber } = request.payload as TransferInput;

    const customerId: string = request.auth["customer"].id;

    const customer: Customer = await queryRunner.manager.findOne(Customer, {
      where: { id: customerId },
    });

    if (customer.balance < amount) {
      return h.response(ErrorMessages.INSUFFICENT_BALANCE).code(400);
    }

    if (customer.gsmNumber === targetGSMNumber) {
      return h.response(ErrorMessages.CAN_NOT_SEND_TO_YOURSELF).code(400);
    }

    const targetCustomer: Customer = await queryRunner.manager.findOne(
      Customer,
      { where: { gsmNumber: targetGSMNumber } }
    );

    if (!targetCustomer) {
      return h.response(ErrorMessages.GSM_NUmber_NOT_FOUND).code(404);
    }

    // Create Pending Transaction
    const newTransaction:Transaction = await queryRunner.manager.save(Transaction, {
      targetId: targetCustomer.id, // Target Customer ID
      sourceId: customer.id, // Current Customer ID
      amount,
      type: TransactionType.TRANSFER,
    });

    // Make Payment
    const payment = await makePayment();

    // Update Transaction Status
    newTransaction.status = payment.status
      ? TransactionStatus.COMPLETED
      : TransactionStatus.FAILED;

    // Update Current Transaction
    const transaction: Transaction = await queryRunner.manager.save(
      Transaction,
      newTransaction
    );

    // Update Current Customer Balance
    customer.balance = customer.balance - amount;
    await queryRunner.manager.save(Customer, customer);

    // Update Target Customer Balance
    targetCustomer.balance = targetCustomer.balance + amount;
    await queryRunner.manager.save(Customer, targetCustomer);

    await queryRunner.commitTransaction();

    // Send Response to the end User about Opearion
    return sendResponse(transaction, h);
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("Error processing Transfer:", error);
    return h.response("Error processing Transfer").code(500);
  } finally {
    await queryRunner.release();
  }
};

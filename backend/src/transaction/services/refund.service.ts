import { Request, ResponseToolkit } from "@hapi/hapi";
import { Customer } from "../../customer/domain/models/customer.model";
import { appDataSource } from "../../db/database";
import { TransactionStatus } from "../domain/enums/transaction-status";
import { TransactionType } from "../domain/enums/transaction-type";
import { Transaction } from "../domain/models/transaction.model";
import { RefundInput } from "../types/refund-input";
import {  ErrorMessages, 
} from "../../shared/constants/error-messages";
import {  getTransactionByNumber,
  makePayment,
  sendResponse} from "../services/transaction.service"

/*

********************** REFUND LOGIC ********************** 
1.  Start the transaction
2.  fetch the customer id from the Token
3.  fetch purchasedTransaction by transactionNumber
4.  check if the purchasedTransaction exists and if not return TRANSACTION_NOT_FOUND error
5.  check if the purchasedTransaction is already refunded and if yes return ALREADY_REFOUNDED error
6.  update the purchasedTransaction status to RETURNED
7.  create a new transaction with the type REFUND with PENDING Status
8.  make a payment (Integration with Payment Provider)
9.  update the transaction status based on the payment status
10. update the customer balance (+ Amount)
11. commit the transaction
12. send the Response to the end user
13. handle the errors and rollback the transaction if any error occurs

*/

export const refund = async (request: Request, h: ResponseToolkit) => {
  const queryRunner = appDataSource.createQueryRunner();

  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { transactionNumber } = request.payload as RefundInput;

    const customerId = request.auth["customer"].id;

    const customer = await queryRunner.manager.findOne(Customer, {
      where: { id: customerId },
    });
 
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

    await queryRunner.commitTransaction();

    // Send Response to the end User about Opearion
    return sendResponse(transaction, h);
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("Error processing refund:", error);
    return h.response("Error processing refund").code(500);
  } finally {
    await queryRunner.release();
  }
};

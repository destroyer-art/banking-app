import { appDataSource } from "../../db/database";
import { Customer } from "../../customer/domain/models/customer.model";
import { TransactionStatus } from "../domain/enums/transaction-status";
import { TransactionType } from "../domain/enums/transaction-type";
import { Transaction } from "../domain/models/transaction.model";
import { TransferInput } from "../types/transfer-input";
import { ErrorMessages, makePayment, sendResponse } from "./helper";

/*
*********** TRANSFER LOGIC *********** 
1) Find Current Customer (User who triggered the TRANSFER) based on Customer ID
1) Find Target Customer based on GSM Number(as AccountID)
3) Create a new Transaction with PENDING status
4) Make Payment (Integration with Payment Gateway)
5) Check if Current Customer has sufficient balance to make the transfer
6) Update Currect Customer balance ( - amount)
7) Update Target Customer balance ( + amount)
8) Update Transaction Status based on Payment Status
9) Send Transaction Information to the end user about current operation
*/

export const transfer = async (request, h) => {
  const queryRunner = appDataSource.createQueryRunner();

  try {
    const { amount, targetGSMNumber } = request.payload as TransferInput;

    const customerId = request.auth["customer"].id;

    const customer: Customer = await queryRunner.manager.findOne(Customer, {
      where: { id: customerId },
    });

    if (!customer) {
      return h.response(ErrorMessages.CUSTOMER_NOT_FOUND).code(404);
    }

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
    const newTransaction = await queryRunner.manager.save(Transaction, {
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

    // Send Response to the end User about Opearion
    return sendResponse(transaction, h);
  } catch (error) {
    console.error("Error processing Transfer:", error);
    return h.response("Error processing Transfer").code(500);
  }
};

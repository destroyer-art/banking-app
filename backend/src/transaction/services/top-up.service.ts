import { Request, ResponseToolkit } from "@hapi/hapi";
import { Customer } from "../../customer/domain/models/customer.model";
import { appDataSource } from "../../db/database";
import { TransactionStatus } from "../domain/enums/transaction-status";
import { TransactionType } from "../domain/enums/transaction-type";
import { Transaction } from "../domain/models/transaction.model";
import { TopUpInput } from "../types/top-up-input";
import { ErrorMessages, makePayment, sendResponse } from "./helper";

/*
*********** TOP UP LOGIC *********** 
1) Find Current Customer (User who triggered the purchase) based on Customer ID
2) Create a new Transaction with PENDING status
2) Make Payment (Integration with Payment Gateway)
3) Update Transaction Status based on Payment Status
4) top UP Customer balance
5) Send Transaction Information to the end user about current operation
*/

export const topUp = async (request: Request, h: ResponseToolkit) => {
  const queryRunner = appDataSource.createQueryRunner();

  try {
    const { customerId, amount, paymentProvider } =
      request.payload as TopUpInput;

    const customer = await queryRunner.manager.findOne(Customer, {
      where: { id: customerId },
    });
    if (!customer) {
      return h.response(ErrorMessages.CUSTOMER_NOT_FOUND).code(404);
    }

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

    // Send Response to the end User about Opearion
    return sendResponse(transaction, h);
  } catch (error) {
    console.error("Error processing Top-up:", error);
    return h.response("Error processing Top-up").code(500);
  }
};

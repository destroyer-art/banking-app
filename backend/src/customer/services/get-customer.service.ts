import { Request } from "@hapi/hapi";
import { ResponseToolkit } from "@hapi/hapi/lib/types";
import { appDataSource } from "../../db/database";
import { ErrorMessages } from "../../shared/constants/error-messages";
import { Customer } from "../domain/models/customer.model";
import { CustomerOutput } from "customer/types/customer-output";
import { QueryRunner } from "typeorm";

/*

********************** Fetch Current Customer Logic ********************** 

1. fetch the customer ID from the Token
2. fetch the customer from the database using the Customer ID
3. check if the customer is not found, return CUSTOMER_NOT_FOUND message
4. return the customer details excluding the password, emailVerified, createdAt

*/

export const getCustomer = async (request: Request, h: ResponseToolkit) => {
  const queryRunner: QueryRunner = appDataSource.createQueryRunner();

  try {
    const customerId: string = request.auth["customer"].id;

    const customer: Customer = await queryRunner.manager.findOne(Customer, {
      where: { id: customerId },
    });

    if (!customer) {
      return h.response(ErrorMessages.CUSTOMER_NOT_FOUND).code(404);
    }

    const { password, emailVerified, createdAt, ...rest } = customer;

    const output: CustomerOutput = { ...rest };

    return h.response(output);
  } catch (error) {
    console.error("Error processing fetch Customer:", error);
    return h.response("Error processing fetch Customer").code(500);
  }
};

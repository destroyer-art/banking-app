import { Request } from "@hapi/hapi";
import { ResponseToolkit } from "@hapi/hapi/lib/types";
import { appDataSource } from "../../db/database";
import { Customer } from "../domain/models/customer.model";
import { CreateCustomerInput } from "../types/create-user-input";
import { ErrorMessages } from "../../transaction/services/helper";

export const registerCustomer = async (req: Request, h: ResponseToolkit) => {
  const queryRunner = appDataSource.createQueryRunner();

  try {
    const { firstName, lastName, dateOfBirth, gsmNumber } =
      req.payload as CreateCustomerInput;

    const customerInput: Partial<Customer> = {
      firstName,
      lastName,
      dateOfBirth,
      gsmNumber,
    };

    const isExist: Customer = await queryRunner.manager.findOne(Customer, {
      where: { gsmNumber },
    });

    if (isExist) {
      return h.response(ErrorMessages.CUSTOMER_ALREADY_EXIST).code(404);
    }

    const newCustomer = await queryRunner.manager.save(Customer, customerInput);

    return h.response(
      `Customer Successfully created with ID: ${newCustomer.id}`
    );
  } catch (error) {
    console.error("Error processing Purchase:", error);
    return h.response("Error processing Purchase").code(500);
  }
};

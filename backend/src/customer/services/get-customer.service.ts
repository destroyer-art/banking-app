import { Request } from "@hapi/hapi";
import { ResponseToolkit } from "@hapi/hapi/lib/types";
import { appDataSource } from "../../db/database";
import { ErrorMessages } from "../../transaction/services/helper";
import { Customer } from "../domain/models/customer.model";

export const getCustomer = async (req: Request, h: ResponseToolkit) => {

  const queryRunner = appDataSource.createQueryRunner();

  try {
    const customerId = req.params.customerId

    const customer = await queryRunner.manager.findOne(Customer, {
      where: { id: customerId },
    });

    if (!customer) {
      return h.response(ErrorMessages.CUSTOMER_NOT_FOUND).code(404);
    }

    return h.response(customer);
  } catch (error) {
    console.error("Error processing fetch Customer:", error);
    return h.response("Error processing fetch Customer").code(500);
  }
};

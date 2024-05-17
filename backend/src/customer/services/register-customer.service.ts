import { Request } from "@hapi/hapi";
import { ResponseToolkit } from "@hapi/hapi/lib/types";
import { genSalt, hash } from "bcryptjs";
import { appDataSource } from "../../db/database";
import { ErrorMessages } from "../../transaction/services/helper";
import { Customer } from "../domain/models/customer.model";
import { RegisterInput } from "../types/register-input";

export const registerCustomer = async (req: Request, h: ResponseToolkit) => {
  const queryRunner = appDataSource.createQueryRunner();

  try {
    const { firstName, lastName, dateOfBirth, gsmNumber, email, password } =
      req.payload as RegisterInput;

    const isGSMNumberExist: Customer = await queryRunner.manager.findOne(
      Customer,
      {
        where: { gsmNumber },
      }
    );

    if (isGSMNumberExist) {
      return h.response(ErrorMessages.GSM_NUMBER_ALREADY_EXIST).code(404);
    }

    const isEmailExist: Customer = await queryRunner.manager.findOne(Customer, {
      where: { email },
    });

    if (isEmailExist) {
      return h.response(ErrorMessages.EMAIL_ALREADY_EXIST).code(404);
    }

    const passwordHash = await hash(password, await genSalt(10));

    const customerInput: Partial<Customer> = {
      email,
      firstName,
      lastName,
      dateOfBirth,
      gsmNumber,
      password: passwordHash,
    };

    const newCustomer = await queryRunner.manager.save(Customer, customerInput);

    return h.response(
      `Customer Successfully created with ID: ${newCustomer.id}`
    );
  } catch (error) {
    console.error("Error processing Register:", error);
    return h.response("Error processing Register").code(500);
  }
};

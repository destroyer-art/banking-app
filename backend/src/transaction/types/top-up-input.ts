import { PaymentProvider } from "../domain/enums/payment-provider";

export class TopUpInput {
  readonly customerId: string;

  readonly amount: number;

  readonly paymentProvider: PaymentProvider;
 }

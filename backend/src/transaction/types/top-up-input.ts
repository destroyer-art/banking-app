import { PaymentProvider } from "../domain/enums/payment-provider";

export class TopUpInput {
  readonly amount: number;
  readonly paymentProvider: PaymentProvider;
 }

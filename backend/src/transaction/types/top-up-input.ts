import { PaymentProvider } from "../domain/enums/payment-provider";

export class TopUpInput {
   amount: number;
   paymentProvider: PaymentProvider;
 }

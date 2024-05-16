export enum AlertStatus {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

export enum PaymentProvider {
  KAPITAL_BANK = "kapital-bank",
  PASHA_BANK = "pasha-bank",
  BANK_RESPUBLIKA = "bank-respublika",
}

export enum ShoppingProvider {
  ZARA = "zara",
  ADIDAS = "adidas",
  NIKE = "nike",
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  gsmNumber: string;
  dateOfBirth: Date;
}

export interface TopUPInput {
  customerId: string;
  amount: number;
  paymentProvider: PaymentProvider;
}

export interface PurchaseInput {
  customerId: string;
  amount: number;
  shoppingProvider: ShoppingProvider;
}

export interface RefundInput {
  customerId: string;
  transactionNumber: string;
}

export interface TransferInput {
  customerId: string;
  targetGSMNumber: string;
  amount: number;
}

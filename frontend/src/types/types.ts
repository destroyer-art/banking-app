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
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gsmNumber: string;
  dateOfBirth: Date;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface TopUPInput {
  amount: number;
  paymentProvider: PaymentProvider;
}

export interface PurchaseInput {
  amount: number;
  shoppingProvider: ShoppingProvider;
}

export interface RefundInput {
  transactionNumber: string;
}

export interface TransferInput {
  targetGSMNumber: string;
  amount: number;
}

export interface JwtPayload {
  id: string;
  firstName: string;
  lastName: string;
  gsmNumber: string;
  email: string;
  balance: number;
}

export interface CustomerOutput {
  email: string;
  firstName: string;
  lastName: string;
  gsmNumber: string;
  dateOfBirth: Date;
  balance: number;
}

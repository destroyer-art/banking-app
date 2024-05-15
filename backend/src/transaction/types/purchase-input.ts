import { ShoppingProvider } from "../domain/enums/shopping-provider";

export class PurchaseInput {
  readonly customerId: string;

  readonly amount: number;

  readonly shoppingProvider: ShoppingProvider;
}

import { ShoppingProvider } from "../domain/enums/shopping-provider";

export class PurchaseInput {
  readonly amount: number;
  readonly shoppingProvider: ShoppingProvider;
}

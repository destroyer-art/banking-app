import { ShoppingProvider } from "../domain/enums/shopping-provider";

export class PurchaseInput {
  amount: number;
  shoppingProvider: ShoppingProvider;
}

import * as Yup from "yup";

export const purchaseSchema = Yup.object({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  shoppingProvider: Yup.string().required("Shopping Provider is required"),
});

import * as Yup from "yup";

export const topUpSchema = Yup.object({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  paymentProvider: Yup.string().required("Payment Provider is required"),
});

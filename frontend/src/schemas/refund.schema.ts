import * as Yup from "yup";

export const refundSchema = Yup.object({
  transactionNumber: Yup.string().required("Payment Provider is required"),
});

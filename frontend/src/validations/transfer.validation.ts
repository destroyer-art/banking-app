import * as Yup from "yup";

export const transferSchema = Yup.object({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  targetGSMNumber: Yup.string().required("Payment Provider is required"),
});

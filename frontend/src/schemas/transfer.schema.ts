import * as Yup from "yup";

const phoneRegex = /^\+994\d{9}$/;

const phoneError =
  "GSM Number must start with +994 and contain 9 digits after the country code";

export const transferSchema = Yup.object({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  targetGSMNumber: Yup.string()
    .required("GSM(Phone) Number is required")
    .matches(phoneRegex, phoneError),
});

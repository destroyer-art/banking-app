import * as Yup from "yup";

export const registerSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gsmNumber: Yup.string().required("GSM Number is required"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .test("is-over-18", "Must be 18 years or older", function (value) {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    }),
});

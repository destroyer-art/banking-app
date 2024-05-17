import * as Yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordError =
  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long";

export const registerSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gsmNumber: Yup.string().required("GSM Number is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(passwordRegex, passwordError),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .test("is-over-18", "Must be 18 years or older", function (value) {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    }),
});

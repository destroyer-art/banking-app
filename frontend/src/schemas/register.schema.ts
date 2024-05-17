import * as Yup from "yup";

const phoneRegex = /^\+994\d{9}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const passwordError =
  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long";

const phoneError =
  "GSM Number must start with +994 and contain 9 digits after the country code";

export const registerSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(passwordRegex, passwordError),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .test("DOB", "You must be at least 18 years old", (value) => {
      return new Date().getFullYear() - new Date(value).getFullYear() >= 18;
    }),
  gsmNumber: Yup.string()
    .required("GSM(Phone) Number is required")
    .matches(phoneRegex, phoneError),
});

import * as Yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordError =
  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long";

export const loginSchema = Yup.object({
  email: Yup.string().required("Username is required"),
  // password: Yup.string()
  //   .required("Password is required")
  //   .matches(passwordRegex, passwordError),
});

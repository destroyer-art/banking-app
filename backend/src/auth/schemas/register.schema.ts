import Joi from "@hapi/joi";

const phoneRegex = /^\+994\d{9}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordError =
  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long";

const phoneError =
  "GSM Number must start with +994 and contain 9 digits after the country code";

export const registerSchema = Joi.object({
  email: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().iso().required(),
  gsmNumber: Joi.string()
    .required("GSM Number is required")
    .pattern(phoneRegex)
    .messages({ phoneError }),
  password: Joi.string()
    .required("Password is required")
    .pattern(passwordRegex)
    .messages({ passwordError }),
});

import Joi from "@hapi/joi";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordError =
  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long";

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string()
    .required("Password is required")
    .pattern(passwordRegex)
    .messages({ passwordError }),
});

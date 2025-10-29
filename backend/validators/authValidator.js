import Joi from "joi";

// Signup validation
export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters long",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match",
        "string.empty": "Confirm Password is required",
      }),
    role: Joi.string()
      .valid("admin", "host", "customer")
      .required()
      .messages({
        "any.only": "Role must be admin, host, or customer",
      }),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });

  // ✅ Remove confirmPassword before controller
  delete value.confirmPassword;
  req.body = value;

  next();
};

// Login validation
export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });

  next();
};

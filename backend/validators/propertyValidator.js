// import Joi from "joi";

// export const propertyValidation = (req, res, next) => {
//   const schema = Joi.object({
//     title: Joi.string().min(3).required(),
//     description: Joi.string().allow(""),
//     location: Joi.string().required(),
//     pricePerNight: Joi.number().positive().required(),
//     type: Joi.string().valid("apartment", "villa", "room", "house").required(),
//     amenities: Joi.array().items(Joi.string()),
//     images: Joi.array().items(Joi.string()),
//   });

//   const { error } = schema.validate(req.body);
//   if (error)
//     return res.status(400).json({ success: false, message: error.details[0].message });

//   next();
// };
import Joi from "joi";

export const propertyValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).required().messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters long",
    }),
    description: Joi.string().allow("").trim(),
    location: Joi.string().trim().required().messages({
      "string.empty": "Location is required",
    }),
    pricePerNight: Joi.number().positive().required().messages({
      "number.positive": "Price must be positive",
      "any.required": "Price per night is required",
    }),
    type: Joi.string()
      .valid("apartment", "villa", "room", "house")
      .required()
      .messages({
        "any.only": "Type must be apartment, villa, room, or house",
      }),
    amenities: Joi.array().items(Joi.string().trim()),
    images: Joi.array().items(Joi.string().trim()),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  next();
};

// import Joi from "joi";

// export const bookingValidation = (req, res, next) => {
//   const schema = Joi.object({
//     propertyId: Joi.string().required(),
//     checkIn: Joi.date().required(),
//     checkOut: Joi.date().required(),
//     totalAmount: Joi.number().positive().required(),
//   });

//   const { error } = schema.validate(req.body);
//   if (error)
//     return res.status(400).json({ success: false, message: error.details[0].message });

//   if (new Date(req.body.checkOut) <= new Date(req.body.checkIn)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Check-out date must be after check-in date" });
//   }

//   next();
// };
import Joi from "joi";

export const bookingValidation = (req, res, next) => {
  const schema = Joi.object({
    propertyId: Joi.string().required().messages({
      "string.empty": "Property ID is required",
    }),
    checkIn: Joi.date().required().messages({
      "date.base": "Check-in date must be a valid date",
      "any.required": "Check-in date is required",
    }),
    checkOut: Joi.date().greater(Joi.ref("checkIn")).required().messages({
      "date.greater": "Check-out date must be after check-in date",
      "any.required": "Check-out date is required",
    }),
    totalAmount: Joi.number().positive().required().messages({
      "number.positive": "Total amount must be positive",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  next();
};

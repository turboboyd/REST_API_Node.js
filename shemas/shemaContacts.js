const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .messages({
      "any.required": "missing required name field",
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      "any.required": "missing required email field",
    })
    .required(),
  phone: Joi.string()
    .pattern(new RegExp("^[0-9+()\\-]*$"))
    .messages({
      "any.required": "missing required phone field",
    })
    .required(),
});

module.exports = {
  addSchema,
};

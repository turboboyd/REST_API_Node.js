const Joi = require("joi");

const addSchemaErrorMessages = {
  "any.required": "missing required {{#label}} field",
  "string.email": "invalid {{#label}} format",
  "string.pattern.base":
    "invalid {{#label}} format.{{#label}} format must: +380000000000 ",
  "object.min": "missing fields",
};

const addSchema = Joi.object()
  .when(Joi.object().min(1), {
    then: Joi.object({
      name: Joi.string().required().label("Name"),
      email: Joi.string().email().required().label("Email"),
      phone: Joi.string()
        .pattern(new RegExp("^[0-9+()\\-]*$"))
        .required()
        .label("Phone"),
    }),
  })
  .min(1)
  .messages(addSchemaErrorMessages);

module.exports = {
  addSchema,
};

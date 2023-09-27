const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

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

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

const schemas = {
  addSchema,
  updateStatusContactSchema,
};

module.exports = {
  Contact,
  schemas,
};



const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers/index");

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
  "object.min": "missing fields",
};

const addSchema = Joi.object()
  .when(Joi.object().min(1), {
    then: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(new RegExp("^[0-9+()\\-]*$")).required(),
    }),
  })
  .min(1)
  .message(addSchemaErrorMessages);

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

const schemas = {
  addSchema,
  // updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};

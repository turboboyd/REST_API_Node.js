const { timestamps } = require("browser-sync/dist/default-config");
const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const fs = require('fs/promises')
const {handleMongooseError} = require("../helpers/index")
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

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
// getContactById,
// removeContact,
// addContact,
// updateContact,
// }



//нужно переписать 
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

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};


module.exports = {
  Contact,
  schemas,
};

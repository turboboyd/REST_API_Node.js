const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const pasemailRegex = /^[a-zA-Z0-9._-]$/;
const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 8,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegex,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const registerSchemaErrorMessages = {
  "any.required": "missing required {{#label}} field",
  "object.min": "missing fields",
  "string.pattern.base": "invalid {{#label}} format",
  "password.string.pattern.base": "invalid {{#label}} format",
};

const registerSchema = Joi.object()
  .when(Joi.object().min(1), {
    then: Joi.object({
      email: Joi.string().pattern(emailRegex).required().label("email"),
      password: Joi.string().min(8).required().pattern(pasemailRegex),
    }),
  })
  .min(1)
  .messages(registerSchemaErrorMessages);


// const loginSchema = Joi.object({
//   email: Joi.string().pattern(emailRegex).required(),
//   password: Joi.string().min(6).required(),
// });

const schemas = {
  registerSchema,
//   loginSchema,
};

module.exports = {
  User,
  schemas,
};

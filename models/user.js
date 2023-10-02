const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

const messagesEmail = {
  "any.required": "missing required {{#label}} field",
  "string.pattern.base": "{#label} format must be: example@example.com",
};

const messagesPassword = {
  "any.required": "missing required {{#label}} field",
  "string.pattern.base":
    "{#label} must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one digit, and one special character (@, $, !, %, *, ?, or &)",
};

const messagesRegisterSchema = { "object.min": "missing fields" };

const registerSchema = Joi.object()
  .when(Joi.object().min(1), {
    then: Joi.object({
      email: Joi.string()
        .pattern(emailRegex)
        .required()
        .messages(messagesEmail),
      password: Joi.string()
        .min(8)
        .required()
        .pattern(passwordRegex)
        .messages(messagesPassword),
    }),
  })
  .min(1)
  .messages(messagesRegisterSchema);

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages(messagesEmail),
  password: Joi.string().min(6).required().messages(messagesPassword),
});

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = {
  User,
  schemas,
};


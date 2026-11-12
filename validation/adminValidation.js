const joi = require("joi");

const createValidationSchema = joi.object({
  name: joi.string().required(),
  login: joi.string().required(),
  hashed_password: joi.string().required(),
  is_active: joi.boolean().optional(),
  is_creator: joi.boolean().optional(),
  hashed_refresh_token: joi.string().optional(),
});

const updateValidationSchema = joi.object({
  name: joi.string().optional(),
  login: joi.string().optional(),
  hashed_password: joi.string().optional(),
  is_active: joi.boolean().optional(),
  is_creator: joi.boolean().optional(),
  hashed_refresh_token: joi.string().optional(),
});

module.exports = {
  createValidationSchema,
  updateValidationSchema,
};
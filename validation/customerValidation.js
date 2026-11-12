const Joi = require('joi')

const createValidationSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    hashed_password: Joi.string().allow(""),
    email: Joi.string().allow(""),
    birth_date: Joi.date(),
    gender: Joi.number(),
    lang_id: Joi.string().allow(""),
    hashed_refresh_token: Joi.string().allow(""),
})

const updateValidationSchema = Joi.object({
    first_name: Joi.string().allow("").optional(),
    last_name: Joi.string().allow("").optional(),
    phone: Joi.string().allow("").optional(),
    hashed_password: Joi.string().allow("").optional(),
    email: Joi.string().allow("").optional(),
    birth_date: Joi.date().optional(),
    gender: Joi.number().optional(),
    hashed_refresh_token: Joi.string().allow("").optional(),
})

module.exports = {
    createValidationSchema,
    updateValidationSchema,
}
const Joi = require('joi')

const createValidationSchema = Joi.object({
    customer_id: Joi.string().allow(""),
    name: Joi.string().required(),
    phone: Joi.string().allow(""),
    number: Joi.string().allow(""),
    year: Joi.string().allow(""),
    month: Joi.string().allow(""),
    is_active: Joi.boolean(),
    is_main: Joi.boolean(),
})

const updateValidationSchema = Joi.object({
    name: Joi.string().allow("").optional(),
    phone: Joi.string().allow("").optional(),
    number: Joi.string().allow("").optional(),
    year: Joi.string().allow("").optional(),
    month: Joi.string().allow("").optional(),
    is_active: Joi.boolean().optional(),
    is_main: Joi.boolean().optional(),
})

module.exports = {
    createValidationSchema,
    updateValidationSchema,
}
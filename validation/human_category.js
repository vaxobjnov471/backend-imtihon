const Joi = require('joi')

const createValidationSchema = Joi.object({
    name: Joi.string().required(),
    start_age: Joi.number(),
    finish_age: Joi.number(),
    gender: Joi.string().valid('male', 'female'),
})

const updateValidationSchema = Joi.object({
    name: Joi.string().allow("").optional(),
    start_age: Joi.number().optional(),
    finish_age: Joi.number().optional(),
    gender: Joi.string().valid('male', 'female').optional(),
})

module.exports = {
    createValidationSchema,
    updateValidationSchema,
}
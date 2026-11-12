const Joi = require('joi')

const createValidationSchema = Joi.object({
    customer_id: Joi.string().allow(""),
    createdAt: Joi.date(),
    finishedAt: Joi.date(),
    status_id: Joi.string().allow(""),
})

const updateValidationSchema = Joi.object({
    createdAt: Joi.date().optional(),
    finishedAt: Joi.date().optional(),
})

module.exports = {
    createValidationSchema,
    updateValidationSchema,
}
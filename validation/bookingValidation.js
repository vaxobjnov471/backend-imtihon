const Joi = require('joi')

const createValidationSchema = Joi.object({
    cart_id: Joi.string().allow(""),
    createdAt: Joi.date(),
    fineshed: Joi.date(),
    payment_method_id: Joi.string().allow(""),
    delivery_method_id: Joi.string().allow(""),
    status_id: Joi.string().allow(""),
})

const updateValidationSchema = Joi.object({
    createdAt: Joi.date().optional(),
    fineshed: Joi.date().optional(),
})

module.exports = {
    createValidationSchema,
    updateValidationSchema,
}
const Joi = require('joi')

const createValidationSchema = Joi.object({
    event_id: Joi.string().allow(""),
    seat_id: Joi.string().allow(""),
    price: Joi.number(),
    service_fee: Joi.number(),
    status_id: Joi.string().allow(""),
    ticket_type: Joi.number(),
})

const updateValidationSchema = Joi.object({
    price: Joi.number().optional(),
    service_fee: Joi.number().optional(),
    ticket_type: Joi.number().optional(),
})

module.exports = {
    createValidationSchema,
    updateValidationSchema,
}
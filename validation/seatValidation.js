const Joi = require('joi')

const createValidationSchema = Joi.object({
    sector: Joi.number(),
    row_number: Joi.number(),
    number: Joi.number(),
    venue_id: Joi.string().allow(""),
    seat_type_id: Joi.string().allow(""),
    location_in_schema: Joi.string().allow(""),
})

const updateValidationSchema = Joi.object({
    sector: Joi.number().optional(),
    row_number: Joi.number().optional(),
    number: Joi.number().optional(),
    location_in_schema: Joi.string().allow("").optional(),
})

module.exports = {
    createValidationSchema,
    updateValidationSchema,
}
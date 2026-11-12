const Joi = require('joi')

const createValidationSchema = Joi.object({
    customer_id: Joi.string().allow(""),
    name: Joi.string().required(),
    region_id: Joi.string().allow(""),
    destrict_id: Joi.string().allow(""),
    street: Joi.string().allow(""),
    house: Joi.string().allow(""),
    flat: Joi.number(),
    location: Joi.string().allow(""),
    post_index: Joi.string().allow(""),
    info: Joi.string().allow(""),
})

const updateValidationSchema = Joi.object({
    name: Joi.string().allow("").optional(),
    street: Joi.string().allow("").optional(),
    house: Joi.string().allow("").optional(),
    flat: Joi.number().optional(),
    location: Joi.string().allow("").optional(),
    post_index: Joi.string().allow("").optional(),
    info: Joi.string().allow("").optional(),
})

module.exports = {
    createValidationSchema,
    updateValidationSchema,
}
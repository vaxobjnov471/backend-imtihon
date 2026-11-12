const Joi = require('joi')

const createValidationSchema = Joi.object({
    name: Joi.string().allow(""),
    address: Joi.string().allow(""),
    location: Joi.string().allow(""),
    site: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    region_id: Joi.string().optional(),
    destrict_id: Joi.string().optional(),
})
const updateValidationSchema = Joi.object({
    name: Joi.string().allow("").optional(),
    address: Joi.string().allow("").optional(),
    location: Joi.string().allow("").optional(),
    site: Joi.string().allow("").optional(),
    phone: Joi.string().allow("").optional(),
})

module.exports = {
   createValidationSchema,
   updateValidationSchema,
}
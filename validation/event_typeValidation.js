const Joi = require('joi')

const createValidationSchema = Joi.object({
    name: Joi.string().allow(""),
    payment_id: Joi.string(),
})
const updateValidationSchema = Joi.object({
    name: Joi.string().allow("").optional(),
})

module.exports = {
   createValidationSchema,
   updateValidationSchema,
}
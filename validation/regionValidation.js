const Joi = require('joi')

const createValidationSchema = Joi.object({
    name: Joi.string().allow("")
})
const updateValidationSchema = Joi.object({
    name: Joi.string().allow("").optional(),
})

module.exports = {
   createValidationSchema,
   updateValidationSchema,
}
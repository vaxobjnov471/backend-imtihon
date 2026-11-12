const Joi = require('joi')

const createValidationSchema = Joi.object({
    venue_id: Joi.string(),
    url: Joi.string(),
})
const updateValidationSchema = Joi.object({
    venue_id: Joi.string().optional(),
})

module.exports = {
   createValidationSchema,
   updateValidationSchema,
}
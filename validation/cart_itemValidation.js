const Joi = require('joi')

const createValidationSchema = Joi.object({
    ticket_id: Joi.string(),
    cart_id: Joi.string(),
})

module.exports = {
   createValidationSchema,
}
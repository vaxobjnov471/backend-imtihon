const Joi = require('joi')

const postValidateSchema = Joi.object({
    types_id: Joi.string().optional(),
    venue_id: Joi.string().optional(),

})

module.exports = {
    postValidateSchema,
}

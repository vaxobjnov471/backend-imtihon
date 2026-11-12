const Joi = require('joi')

const createValidationSchema = Joi.object({
     name: Joi.string().allow(""),
     region_id: Joi.string().optional(),
})


const updateValidationSchema = Joi.object({
    name: Joi.string().allow("").optional(),
})

module.exports = {
   createValidationSchema,
   updateValidationSchema,
}
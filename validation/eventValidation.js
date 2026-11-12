const Joi = require('joi')

const createValidationSchema = Joi.object({
    name: Joi.string().required(),
    photo: Joi.string().allow(""),
    start_date: Joi.date(),
    start_time: Joi.string().allow(""),
    finish_date: Joi.date(),
    finish_time: Joi.string().allow(""),
    info: Joi.string().allow(""),
    event_type_id: Joi.string().allow(""),
    human_category_id: Joi.string().allow(""),
    venue_id: Joi.string().allow(""),
    lang_id: Joi.string().allow(""),
    release_date: Joi.date(),
})

const updateValidationSchema = Joi.object({
    name: Joi.string().allow("").optional(),
    photo: Joi.string().allow("").optional(),
    start_date: Joi.date().optional(),
    start_time: Joi.string().allow("").optional(),
    finish_date: Joi.date().optional(),
    finish_time: Joi.string().allow("").optional(),
    info: Joi.string().allow("").optional(),
    release_date: Joi.date().optional(),
})

module.exports = {
    createValidationSchema,
    updateValidationSchema,
}
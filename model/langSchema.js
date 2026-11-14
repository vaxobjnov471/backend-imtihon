const { Schema, model } = require('mongoose')

const langSchema = new Schema ({
    name: {type: String, required: true}
})

const Lang = model('lang', langSchema)
module.exports = { Lang }
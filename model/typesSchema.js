const { Schema, model } = require('mongoose')

const typesSchema = new Schema ({
    name: {type: String, required: true}
})

const Types = model('types', typesSchema)
module.exports = { Types }
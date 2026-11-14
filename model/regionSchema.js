const { Schema, model } = require('mongoose')

const regionSchema = new Schema ({
    name: {type: String, required: true}
})

const Region = model('region', regionSchema)
module.exports = { Region }
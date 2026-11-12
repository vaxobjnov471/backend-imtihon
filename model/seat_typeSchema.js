const { Schema, model } = require('mongoose')

const seat_typeSchema = new Schema ({
    name: {type: String, require: true}
})

const Seat_Type = model('seat_type', seat_typeSchema)
module.exports = { Seat_Type }
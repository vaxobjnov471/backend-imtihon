const { Schema, model } = require('mongoose')
const { Venue } = require('./venueSchema')
const { Seat_Type } = require('./seat_typeSchema')

const seatSchema = new Schema({
    sector: { type: Number },
    row_number: { type: Number },
    number: { type: Number },
    venue_id: { type: Schema.Types.ObjectId, ref: Venue, default: null },
    seat_type_id: { type: Schema.Types.ObjectId, ref: Seat_Type, default: null },
    location_in_schema: {type: String},
})


const Seat = model('seat', seatSchema)
module.exports = { Seat }
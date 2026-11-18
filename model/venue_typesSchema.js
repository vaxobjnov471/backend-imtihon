const { Schema, model } = require('mongoose')
const { Venue } = require("./venueSchema")
const { Types } = require('./typesSchema')


const venueTypes = new Schema({
    venue_id: {type: Schema.Types.ObjectId, ref: Venue, default: null },
    types_id: {type: Schema.Types.ObjectId, ref: Types, default: null },
})

const VenueTypes  = model('venueTypes', venueTypes)
module.exports = {VenueTypes}

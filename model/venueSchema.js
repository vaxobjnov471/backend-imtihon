const { Schema, model } = require('mongoose')
const { Region } = require('./regionSchema')
const { Destrict } = require('./destrictSchema')

const venueSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String },
    location: { type: String },
    site: { type: String },
    phone: { type: String },
    region_id: { type: Schema.Types.ObjectId, ref: Region, default: null },
    destrict_id: { type: Schema.Types.ObjectId, ref: Destrict, default: null },
})


const Venue = model('venue', venueSchema)
module.exports = { Venue }
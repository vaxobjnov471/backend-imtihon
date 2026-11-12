const {Schema, model} = require('mongoose')
const {Venue} = require('./venueSchema')



const VenuePhoto = new Schema({
    venue_id: {type: Schema.Types.ObjectId, ref: Venue},
    url: {type: String, },
})

const venue_Photo = model('VenuePhoto', VenuePhoto)
module.exports ={venue_Photo}
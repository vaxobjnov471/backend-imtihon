const { Schema, model } = require('mongoose')
const { Event_type}= require('./event_typeSchema')
const { Venue } = require('./venueSchema')
const { Lang } = require('./langSchema')
const { Human } = require('./human_categorySchema')


const eventSchema = new Schema({
    name: { type: String, required: true },
    photo: { type: String },
    start_date: { type: Date },
    start_time: { type: String },
    finish_date: { type: Date },
    finish_time: { type: String },
    info: { type: String },
    event_type_id: { type: Schema.Types.ObjectId, ref: Event_type, default: null },
    human_category_id: { type: Schema.Types.ObjectId, ref: Human, default: null },
    venue_id: { type: Schema.Types.ObjectId, ref: Venue, default: null },
    lang_id: { type: Schema.Types.ObjectId, ref: Lang, default: null },
    release_date: { type: Date },
})

const Event = model('event', eventSchema)
module.exports = { Event }
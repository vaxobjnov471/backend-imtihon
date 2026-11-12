const { Schema, model } = require('mongoose')
const { Event } = require('./eventSchema')
const { Seat } = require('./seatSchema')
const { Ticket_status } = require('./ticket_statusSchema')

const ticketSchema = new Schema({
    event_id: { type: Schema.Types.ObjectId, ref: Event, default: null },
    seat_id: { type: Schema.Types.ObjectId, ref: Seat, default: null },
    price: { type: Number, },
    service_fee: { type: Number, },
    status_id: { type: Schema.Types.ObjectId, ref: Ticket_status, default: null },
    ticket_type: { type: Number },
})

const Ticket = model('ticket', ticketSchema)
module.exports = { Ticket }
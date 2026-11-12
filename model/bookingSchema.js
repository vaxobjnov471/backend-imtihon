const { Schema, model } = require('mongoose')
const { Cart } = require('./cartSchema')
const { Payment_method } = require('./payment_methodSchema')
const { Delivery_method } = require('./delivery_methodSchema')
const { Ticket_status } = require('./ticket_statusSchema')
const bookingSchema = new Schema({
    cart_id: { type: Schema.Types.ObjectId, ref: Cart, default: null },
    createdAt: { type: Date  },
    fineshed: { type: Date },
    payment_method_id: { type: Schema.Types.ObjectId, ref: Payment_method, default: null },
    delivery_method_id: { type: Schema.Types.ObjectId, ref: Delivery_method, default: null },
    status_id: { type: Schema.Types.ObjectId, ref: Ticket_status, default: null },
})

const Booking = model('booking', bookingSchema)
module.exports = { Booking }
const { Schema, model } = require('mongoose')
const { Customer } = require('./customerSchema')
const { Ticket_status} = require('./ticket_statusSchema')

const cartSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: Customer, default: null },
    createdAt: {type: Date},
    finishedAt: { type: Date },
    status_id: { type: Schema.Types.ObjectId, ref: Ticket_status, default: null },
})

const Cart = model('cart', cartSchema)
module.exports = { Cart }
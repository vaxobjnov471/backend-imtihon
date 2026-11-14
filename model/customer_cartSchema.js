const { Schema, model } = require('mongoose')
const { Customer } = require('./customerSchema')

const customer_cardSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: Customer, default: null },
    name: { type: String, required: true },
    phone: { type: String },
    number: { type: String },
    year: { type: String },
    month: { type: String },
    is_active: { type: Boolean, },
    is_main: { type: Boolean, },
})  

const Customer_cart = model('customer_card', customer_cardSchema)
module.exports = { Customer_cart }
const { Schema, model } = require('mongoose')
const { Customer } = require('./customerSchema')
const { Region } = require('./regionSchema')
const { Destrict } = require('./destrictSchema')

const customer_addressSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: Customer, default: null },
    name: { type: String, required: true },
    region_id: { type: Schema.Types.ObjectId, ref: Region, default: null },
    destrict_id: { type: Schema.Types.ObjectId, ref: Destrict, default: null },
    street: { type: String },
    house: { type: String },
    flat: { type: Number },
    location: { type: String },
    post_index: { type: String },
    info: { type: String },
})

const Customer_address = model('customer_address', customer_addressSchema)
module.exports = { Customer_address }
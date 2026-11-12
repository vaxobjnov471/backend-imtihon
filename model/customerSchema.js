const { Schema, model } = require('mongoose')
const { Lang } = require('./langSchema')

const customerSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String },
    phone: { type: String },
    hashed_password: { type: String },
    email: { type: String },
    birth_date: { type: Date },
    gender: { type: Number },
    lang_id: { type: Schema.Types.ObjectId, ref: Lang, default: null },
    hashed_refresh_token: { type: String },
})

const Customer = model('customer', customerSchema)
module.exports = { Customer }
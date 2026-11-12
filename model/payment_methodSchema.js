const { Schema, model } = require('mongoose')

const payment_methodSchema = new Schema ({
    name: {type: String, require: true}
})

const Payment_method = model('payment_method', payment_methodSchema)
module.exports = { Payment_method }
const { Schema, model } = require('mongoose')

const delivery_methodSchema = new Schema ({
    name: {type: String, required: true}
})

const Delivery_method = model('delivery_method', delivery_methodSchema)
module.exports = { Delivery_method }
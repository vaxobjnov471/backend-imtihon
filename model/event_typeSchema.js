const { Schema, model } = require('mongoose')
const {Payment_method} =require('./payment_methodSchema')


const Event_typeSchema = new Schema ({
    name: {type: String, required: true},
    payment_id: {type: Schema.Types.ObjectId, ref: Payment_method},

})

const Event_type = model('Event_type', Event_typeSchema)
module.exports = { Event_type }
const { Schema, model } = require('mongoose')

const ticket_statusSchema = new Schema ({
    name: {type: String, require: true}
})

const Ticket_status = model('ticket_status', ticket_statusSchema)
module.exports = { Ticket_status }
const {Schema, model} = require('mongoose')
const {Ticket} = require('./ticketSchema')
const {Cart} = require('./cartSchema')




const CartItem = new Schema({
    ticket_id: {type: Schema.Types.ObjectId, ref: Ticket},
    cart_id: {type: Schema.Types.ObjectId, ref: Cart},
    
})

const cart_Item = model('CartItem', CartItem)
module.exports ={cart_Item}
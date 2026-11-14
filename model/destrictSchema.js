const { Schema, model } = require('mongoose')
const {Region} =  require('./regionSchema')

const destrictSchema = new Schema ({
    name: {type: String, required: true},
    region_id: {type: Schema.Types.ObjectId, ref: Region, default: null},
})

const Destrict = model('dectrict', destrictSchema)
module.exports = { Destrict }
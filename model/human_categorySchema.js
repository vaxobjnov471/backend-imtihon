const { Schema, model } = require('mongoose')

const humanSchema = new Schema ({
    name: {type: String, require: true},
    start_age: {type: Number },
    finish_age: {type: Number },
    gender: {type: String, enum: ['male', 'female'], alias: "jinsi" }
})

const Human = model('humanSchema', humanSchema)
module.exports = { Human }
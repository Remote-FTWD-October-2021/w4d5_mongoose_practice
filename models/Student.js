
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  age: {type: Number, required: true, max: 99},
  grades: {type: Array},
  class: {type: String, enum: ["A", "B"]},
  pendingBills: {type: Boolean, default: false},
  idioma: {type: String, enum: ["ingles", "español", "NA"]}
  
}, { versionKey: false, timestamps: true  })

module.exports = mongoose.model('Student', studentSchema)
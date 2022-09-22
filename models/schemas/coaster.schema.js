const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CoasterSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  inversions: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
})

module.exports = CoasterSchema
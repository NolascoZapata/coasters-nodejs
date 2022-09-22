const mongoose = require('mongoose')
const Schema = mongoose.Schema


const OrderSchema = new Schema({
  buyer:{
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Invalid email",
      ],
    }
  },
  
  total: {
    type: String,
    required: true
  },
  
  item: {
    type: Array,
    required: true
  },
})

module.exports = OrderSchema
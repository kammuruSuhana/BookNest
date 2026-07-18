const mongoose = require("mongoose");

const schema = new mongoose.Schema({

  name: String,

  email: String,

  password: String,

  status: {
    type: String,
    default: "Active"
  },

  orders: {
    type: Array,
    default: []
  },

  wishlist: {
    type: Array,
    default: []
  }

});

module.exports = mongoose.model("Users", schema);
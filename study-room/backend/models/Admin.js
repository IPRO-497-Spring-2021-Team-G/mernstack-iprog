// ORM to interact with MongoDB database
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true, 
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
        type: Date,
        default: Date.now
  }
});

module.exports = Admin = mongoose.model("Admin", AdminSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableSchema = new Schema({
  tableName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  capacity: { type: Number, required: true },
  description: { type: String, required: true },
  isEmpty: { type: String, required: true },
}, 
{
  timestamps: true,
});

module.exports = Table = mongoose.model("Table", tableSchema);
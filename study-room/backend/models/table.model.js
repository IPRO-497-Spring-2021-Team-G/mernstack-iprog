const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableSchema = new Schema({
  tableName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
}, {
  timestamps: true,
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;

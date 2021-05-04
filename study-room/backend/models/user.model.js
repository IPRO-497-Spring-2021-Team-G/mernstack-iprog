const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

  tableName: { type: String, required: true },
  usedby: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

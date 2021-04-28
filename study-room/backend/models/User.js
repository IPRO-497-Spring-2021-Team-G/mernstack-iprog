const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

  tableName: { 
    type: String, 
    required: true 
  },
  usedby: { 
    type: String, 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true },
}, {
  timestamps: true,
});

module.exports = User = mongoose.model('User', UserSchema);




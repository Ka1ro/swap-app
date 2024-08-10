const mongoose = require('mongoose');

const SetSchema = mongoose.Schema({
  collectionName: {
    type: String,
    required: true,
    unique: true
  },
  items: {
    type: [String],
    default: []
  }
},
{
  timestamps: true
}) 
;

module.exports = mongoose.model("Sets", SetSchema);
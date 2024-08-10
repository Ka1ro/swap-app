const mongoose = require('mongoose');
const { float } = require('webidl-conversions');

const ItemScema = mongoose.Schema({
  name : {
    type: String,
    required: true,
    unique: true
  },
  collectionName: {
    type: String,
    required: true,
  },
  imageUrl: String,
  price: Number,
  _id: {
    type: String,
    default: 'new-item-000',
  },
  users:{
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Items", ItemScema);
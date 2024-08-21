const { Timestamp } = require('bson');
const mongoose = require('mongoose');



const UserScema = mongoose.Schema({
  login : {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String, 
    required: true,
    unique: true
  },
  location: String,
  items: {
    type: [String],
    default: [],
  },
  avatarUrl: {
    type: String,
    default: '/static/imgs/standartAvatar.jpg',
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserScema);

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  lop: String,
  loa: String,
  authId: String,
  email: String,
  password: String,
  role: String,
  picture: String,
  chuyenmuc: [String],
  linkfacebook: String,
  phonenumber: String,
  created: Date,
  updated: Date,
  refreshToken: String,
})

const User = mongoose.model('User', userSchema)
module.exports = User


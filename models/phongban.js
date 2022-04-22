const mongoose = require('mongoose')
const phongbanSchema = mongoose.Schema({
  name: String,
  create_at: Date,
  id:String,
})

const Phongban = mongoose.model('Phongban', phongbanSchema)
module.exports = Phongban


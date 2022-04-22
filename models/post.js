const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
  content: String,
  user_id: String,
  img:[String],
  linkvideo:String,
  linkyoutube:String,
  comment: [{
    user_id: String,
    content:  String,
    creat_at: Date,   
    updated_at: Date
  }],
  like: [String],
  creat_at: Date,
  updated_at: Date
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
  
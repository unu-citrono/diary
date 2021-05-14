var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  'userName': String,
  'password': String,
  'email': String,
  'phoneNum': String,
  'diaryBooks': [
    {
      'name': ''
    }
  ]
}, { collection: "user" })

// 定义一个user模型，可以根据这个模型调用其API方法。
module.exports = mongoose.model('user', userSchema)

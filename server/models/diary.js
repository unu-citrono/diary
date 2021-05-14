var mongoose = require('mongoose')
var Schema = mongoose.Schema

var diarySchema = new Schema({
  'title': String,
  'content': String,
  'viewLimit': String,
  'diaryBook': String,
  'createTime': String,
  'userId': mongoose.Schema.ObjectId
}, {collection: 'diarydetail'})

// 定义一个user模型，可以根据这个模型调用其API方法。
module.exports = mongoose.model('diary', diarySchema)

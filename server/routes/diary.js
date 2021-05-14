var express = require('express')
var router = express.Router() // 拿到express框架的路由
var mongoose = require('mongoose')
var Diary = require('../models/diary')
var User = require('../models/user')
const formidable = require('formidable')

// // 链接MongoDB数据库
// mongoose.connect('mongodb://127.0.0.1:27017/diary');  

// // 连接成功操作
// mongoose.connection.on("connected",function(){
// 	console.log("MongoDB connected success.")
// })

// // 连接失败操作
// mongoose.connection.on("error",function(){
// 	console.log("MongoDB connected fail.")
// })

// // 连接断开操作
// mongoose.connection.on("disconnected",function(){
// 	console.log("MongoDB connected disconnected.")
// })

// 查询日记
router.get('/diaryList', function(req, res, next) {
  var userId = process.env.userId
  var param = req.query.diaryBook ? {
		'userId': mongoose.Types.ObjectId(userId),
    // 'diaryBook': req.query.diaryBook
  } : { 'userId': mongoose.Types.ObjectId(userId) }
  // var param = {
	// 	'userId': mongoose.Types.ObjectId(req.query.userId)
  //   // '_id': mongoose.Types.ObjectId('609629c780c61eb386d6d5a6')
	// }
  Diary.find(param, function(err, result) {
    if (err) {
      // console.log(err)
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      // console.log(result)
      if (result) {
        res.json({
					status: '200',
					msg: 'success',
					result:{
						diaryList: result
					}
				})
      }
    }
  })
})

// 添加新日记
router.post('/addDiary', function(req, res, next) {
  var diary = new Diary ({
    title: req.body.title,
    content: req.body.content,
    diaryBook: req.body.diaryBook,
    viewLimit: req.body.viewLimit,
    createTime: req.body.createTime,
    userId: mongoose.Types.ObjectId(req.body.userId)
  })
  diary.save(function(err, result) {
    if(err){
			res.json({
        status: "1",
        msg: err.message
			})
		} else{
      res.json({
        status: "200",
        msg: 'success'
      })
      // var param = {
      //   '_id': mongoose.Types.ObjectId(req.body.userId)
      // }
      // User.find(param, function(err2, result2) {
      //   if(err2) {
      //     res.json({
      //       status: "1",
      //       msg: err.message
      //     })
      //   } else {
      //     result.diaryBooks.forEach((item) => {
      //       if(item.name == req.body.diaryBook) {
      //         var data = item
      //         data.counr = data.count + 1
      //         User.updateOne(param, {diary})
      //       }
      //     })
      //   }
      // })
    }
  })
})

// 修改日记内容
router.post('/editDiary', function(req, res, next) {
  var param = {
    '_id': mongoose.Types.ObjectId(req.query.userId)
  }

  Diary.updateOne(param, req.query.data, function(err, result) {
    if(err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      console.log(result)
    }
  })
})

// 上传文件
router.post('/upload', function(req, res, next) {
  console.log(req)
  let form = new formidable.IncomingForm()
  form.encoding = 'utf-8' // 编码
  form.keepExtensions = true // 保留扩展名
  form.uploadDir ='src/assets/images/' //文件存储路径 最后要注意加 '/' 否则会被存在public下

  form.parse(req, (err, fileds ,files) => { // 解析 formData 数据
    if(err) return next(err) 
    console.log(fileds)
    console.log(files)
    // let username = fileds.name //用户名 用于修改用户头像路径
    // let oldPath = files.file.path //获取文件路径 ~/public/images/<随机生成的文件名>.<扩展名>
    // let imgname = files.file.name //前台上传时的文件名 也就是文件原本的名字
    // let userImgname = imgname.replace(/[^.]+/, username) //把扩展名前的文件名给替换掉
    // //我这里为了方便存储 统一将文件名改为 <用户名>.jpg
    // let newPath = path.join(path.dirname(oldPath), userImgname) ;
    // fs.rename(oldPath, newPath, (err) => {//fs重命名
    //   if(err) return next(err)
    //   res.json({ avatar: userImgname })
    //   })
  })
})

module.exports = router

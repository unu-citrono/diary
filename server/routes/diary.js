var express = require('express')
var router = express.Router() // 拿到express框架的路由
var mongoose = require('mongoose')
var Diary = require('../models/diary')
var User = require('../models/user')
var path = require('path')
var fs = require('fs')
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

// 按照用户id查询日记
router.get('/diaryList', function(req, res, next) {  
  let userId = req.query.userId ? req.query.userId : process.env.userId
  let param = req.query.diaryBook ? {
    userId: mongoose.Types.ObjectId(userId),
    diaryBook: req.query.diaryBook
  } : { userId: mongoose.Types.ObjectId(userId) }
  // console.log(param)
  if(req.query.viewLimit === '2') param.viewLimit = '2'
  let sort = {}
  if(req.query.timeSort == '1') sort.createTime = 1
  else sort.createTime = -1
  // console.log(sort)
  Diary.find(param).sort(sort).exec(function(err, result) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
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

// 查询所有日记
router.get('/allDiary', function(req, res, next) {
  let param = {}
  if(req.query.viewLimit) param.viewLimit = req.query.viewLimit
  if(req.query.isInform) param.isInform = req.query.isInform
  Diary.find(param).sort({'createTime': -1}).exec(function(err, result) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
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

// 查询某天的日记
router.get('/dateDiary', function(req, res, next) {
  let date = req.query.date
  let start = date + ' 00:00'
  let end = date + '23:59'
  console.log(date)
  Diary.find({"createTime": {$gte: start, $lte: end }}, function(err, result) {
    if (err) {
      res.json({
        status: "500",
        msg: err.message
      })
    } else {
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

// 查询一年中每月的日记数量
router.get('/statDiary', function(req, res, next) {
  let year = req.query.year
  let month = 12
  let nowYear = new Date().getFullYear().toString()
  if(req.query.year == nowYear) {
    year = nowYear
    month = new Date().getMonth() + 1
  }
  let param = {}
  if(req.query.userId) param.userId = req.query.userId
  var countArr = [];
  (function iterator(i){
    if(i <= month){
      let start = i < 10 ? year + '/0' + i +'/' +'01 00:00' : year + '/' + i +'/' +'01 00:00'
      let end = i < 10 ? year + '/0' + i +'/' +'31 23:59' : year + '/' + i +'/' +'31 23:59'
      param.createTime = {$gte: start, $lte: end }
      Diary.countDocuments(param, function(err, result) {
      // Diary.countDocuments({"createTime": {$gte: start, $lte: end }}, function(err, result) {
        if (err) {
         throw err
        } else {
          countArr.push(result);
          iterator(i + 1)
        }
      })
    } else {
      res.json({
        status: '200',
        msg: 'success',
        result:{
          countArr: countArr,
          month: month
        }
      })
    }
  })(1);
})

// 查询心情统计信息
// router.get('/statMood', function(req, res, next) {
//   let param = {
//     userId: mongoose.Types.ObjectId(process.env.userId)
//   }
  
// })

// 模糊查询
router.get('/search', function(req, res, next) {
  let regexp = new RegExp(req.query.keyword,'i')
  let param = {
    $or: [
      {title: {$regex: regexp}},
      {content: {$regex: regexp}}
    ]
  }
  if(req.query.userId) param.userId = mongoose.Types.ObjectId(req.query.userId)
  else param.userId = mongoose.Types.ObjectId(process.env.userId)
  Diary.find(param, function(err, result) {
      if (err) {
        res.json({
          status: "500",
          msg: err.message
        })
      } else {
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

// 查询所有日记数
router.get('/allDiaryCount', function(req, res, next) {
  Diary.countDocuments(function(err, result) {
    if (err) {
      res.json({
        status: "500",
        msg: err.message
      })
    } else {
      res.json({
        status: '200',
        result: result
      })
    }
  })
})


// 根据日记本名获取日记数量
router.get('/diaryCount', function(req, res, next) {
	let param = {
		'userId': mongoose.Types.ObjectId(process.env.userId),
		'diaryBook': req.query.diaryBook
	}
	Diary.countDocuments(param, function(err, result) {
    if (err) {
      res.json({
        status: "500",
        msg: err.message
      })
    } else {
      res.json({
        status: '200',
        result: result
      })
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
    mood: req.body.mood,
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
      var param = {
        '_id': mongoose.Types.ObjectId(req.body.userId),
        'diaryBooks.name': req.body.diaryBook

      }
    }
  })
})

// 上传日记图片
router.post('/upload', function(req, res, next) {
  const form = formidable({ multiples: true })
  form.keepExtensions = true // 保留扩展名
	form.uploadDir = path.normalize(__dirname + "/../upload/diary")
	form.parse(req, (err, fileds, files) => {
		if(err) {
			res.json({
				status: "500",
				msg: err.message
			})
		}
		console.log(files)
    var name = process.env.userId + new Date().getTime() + ".jpg"
		var oldpath = files.file.path
		var newpath = path.normalize(__dirname + "/../upload/diary") + "/" + name
		fs.rename(oldpath, newpath, function(err) {
			if(err) {
				res.json({
					status: "500",
					msg: err.message
				})
			} else {
				res.json({
					status: "200",
					msg: '上传成功',
          result: {
            name: name
          }
				})
			}
		})
	})
})

// 删除服务器图片
router.put('/delPicture', function(req, res, next) {
  let removeIds = req.body.ids
  removeIds.forEach(item => {
    let path = __dirname + "/../upload/diary/" + item
    fs.rm(path, err => {
      if(err) {
        res.json({
					status: "500",
					msg: err.message
				})
      } else {
        res.json({
					status: "200",
					msg: '删除成功'
				})
      }
    })
  })
  
})

// 修改日记内容
router.put('/editDiary', function(req, res, next) {
  var param = {
    _id: mongoose.Types.ObjectId(req.body._id)
  }
  let data = {
    title: req.body.title,
    content: req.body.content,
    diaryBook: req.body.diaryBook,
    viewLimit: req.body.viewLimit,
    createTime: req.body.createTime,
    mood: req.body.mood,
  }
  Diary.updateOne(param, data, function(err, result) {
    if(err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      res.json({
        status: '200',
        msg: 'success'
      })
    }
  })
})

// 举报日记
router.put('/inform', function(req, res, next) {
  var param = {
    _id: mongoose.Types.ObjectId(req.body._id)
  }
  let data = {
    type: req.body.informType,
    content: req.body.informContent ? req.body.informContent : ''
  }
  Diary.updateOne(param, {
    $push: {information: data},
    isInform: '1'
  }, function(err, result) {
    if(err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      res.json({
        status: '200',
        msg: 'success'
      })
    }
  })
})

// 删除日记
router.put('/deleteDiary', function(req, res, next) {
  let param = {
		'_id': mongoose.Types.ObjectId(req.body.id)
	}
	Diary.deleteOne(param, function(err, result) {
		if(err){
			res.json({
				status: "500",
				msg: err.message
			})
		} else{
			console.log(result)
			res.json({
				status: '200',
				message: 'success'
			})
		}
	})
})

module.exports = router
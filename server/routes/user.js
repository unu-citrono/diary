var express = require('express')
var router = express.Router() // 拿到express框架的路由
var mongoose = require('mongoose')
var User = require('../models/user')
var jwt = require('jsonwebtoken')
var formidable=require('formidable') //上传功能的插件
var fs = require('fs')
var path = require('path')
const multer = require('multer')
const { listenerCount } = require('../models/user')


// 链接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/diary');  

// 连接成功操作
mongoose.connection.on("connected",function(){
	console.log("MongoDB connected success.")
})

// 连接失败操作
mongoose.connection.on("error",function(){
	console.log("MongoDB connected fail.")
})

// 连接断开操作
mongoose.connection.on("disconnected",function(){
	console.log("MongoDB connected disconnected.")
})

// 用户注册
router.post('/regist', function(req, res, next) {
	console.log(req.body)
	var user = new User({
		'userName': req.body.userName,
		'password': req.body.password,
		'email': req.body.email,
		'phoneNum': req.body.phoneNum,
		'diaryBooks': [
			{
				name: "默认笔记本",
				imgUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
				count: '1'
			}
		]
	})
	user.save(function(err, result) {
    if(err){
			res.json({
					status: "1",
					msg: err.message
			})
		} else{
			res.json({
				status: '200',
				msg: 'success',
				result:{
					// diaryList: result
				}
			})
    }
  })
})

//用户登录
router.post('/login', function(req, res, next) {
	var param = {
		'userName': req.body.userName,
		'password': req.body.password
	}
	console.log(req.body)
	// 根据用户名密码查找数据库
	User.findOne(param, function(err, result) {
		if(err){
			res.json({
				status: "500",
				msg: err.message
			})
		} else{
			console.log(result)
				// 结果不为空
				if(result){
					const token = jwt.sign({
						name: result.userName,
						_id: result._id
					}, 'my_token', { expiresIn: 60 * 60 * 1 })
					res.json({
							status: '200',
							msg:'success',
							result:{
								// userName: result.userName
								userId: result._id,
								token: token
							}
					})
				}
				else {
					res.json({
						status: "500",
						msg: '查无此用户'
					})
				}
			}
	})
})

// 获取用户信息
router.get('/info', function(req, res, next) {
	var param = {
		'_id': mongoose.Types.ObjectId(process.env.userId)
	}
	User.findOne(param, function(err, result) {
		if(err) {
			res.json({
				status: "500",
				msg: err.message
			})
		} else {
			if(result) {
				res.json({
					status: "200",
					msg: 'success',
					result: result
				})
			}
		}
	})
})

// 修改用户密码
router.put('/changPwd', function(req, res, next) {
	let param = {
		'password': req.body.password || '',
	}
	User.updateOne( {_id: mongoose.Types.ObjectId(process.env.userId) }, param, function(err, result) {
		if(err) {
			res.json({
				status: "500",
				msg: err.message
			})
		} else {
			if(result) {
				res.json({
					status: "200",
					result: result
				})
			}
		}
	})
})

//修改用户信息
router.put('/changInfo', function(req, res, next) {
	let param = {
		'userName': req.body.userName,
		'email': req.body.email,
		'gender': req.body.gender,
		'phoneNum': req.body.phoneNum
	}
	User.updateOne( {_id: mongoose.Types.ObjectId(process.env.userId) }, param, function(err, result) {
		if(err) {
			res.json({
				status: "500",
				msg: err.message
			})
		} else {
			if(result) {
				console.log(result)
				res.json({
					status: "200",
					result: result
				})
			}
		}
	})
})

// 上传图片
router.post('/upload', function(req, res, next) {
	const form = formidable({ multiples: true })
  form.keepExtensions = true // 保留扩展名
	form.uploadDir = path.normalize(__dirname + "/../upload/avatar")
	form.parse(req, (err, fileds, files) => {
		if(err) {
			res.json({
				status: "500",
				msg: err.message
			})
		}
		// console.log(files)
	
		var oldpath = files.file.path
		var newpath = path.normalize(__dirname + "/../upload/avatar") + "/" + process.env.userId + ".jpg"
		fs.rename(oldpath, newpath, function(err) {
			if(err) {
				res.json({
					status: "500",
					msg: err.message
				})
			} else {
				res.json({
					status: "200",
					msg: '上传成功'
					// result: {
					// 	avatar: 
					// }
				})
			}
		})
	})
})

// 获取当前用户日记本
router.get('/diaryBooks', function(req, res, next) {
	var param = {
		'_id': mongoose.Types.ObjectId(process.env.userId)
	}
	User.findOne(param, function(err, result) {
		if(err){
			res.json({
					status: "1",
					msg: err.message
				})
		} else{
			if(result) {
				res.json({
					status: '200',
					msg: 'success',
					result:{
						diaryBooks: result.diaryBooks
					}
				})
			}
		}
	})
})

module.exports = router

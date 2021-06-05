var express = require('express')
var bodyParser = require('body-parser')

var index = require('./routes/index')
var user = require('./routes/user')
var diary = require('./routes/diary')
var jwt = require('jsonwebtoken')

var app  = express()

app.use('/avatar', express.static('./upload/avatar'))
app.use('/diaryUpload', express.static('./upload/diary'))

// 捕获登录状态
app.use(function(req, res, next) {
  var url = req.url
  var urlArr = ['/user/login', '/user/regist', '/diary/allDiary', '/avatar', '/user/allUserCount', '/diary/allDiaryCount']
  if (urlArr.indexOf(url) >= 0) {
    next()
    return false
  }
  // 获取请求头中的的token
  var token =  req.headers['authorization']
  var secretOrPrivateKey = 'my_token'
  jwt.verify(token, secretOrPrivateKey, function (err, decode) {
    if (err) { // 当token过期，或这是一个伪造的token，或这是无效的token时会触发此逻辑
      console.log(url)
      res.json({
        status: '401',
        msg: err.message
      })
    } else {
      // console.log(decode) // {“username”:“张三”}
      var userId = decode._id
      process.env.userId = userId
      next()
    }
  })
})

app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next()
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/user', user)
app.use('/diary', diary)

app.listen(3000)

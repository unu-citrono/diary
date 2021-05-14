const path=require('path');  
function resolve (dir) {  
    path.join(__dirname, dir);  
}  

const name = 'Diary'

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  devServer: {
    proxy: {
      //配置跨域
      "/api": {
        target: "http://localhost:3000/", //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/api": "" //请求的时候使用这个api就可以
        }
      }
    }
  }
}

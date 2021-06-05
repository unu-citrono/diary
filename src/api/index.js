//axios.js
import axios from 'axios'
import qs from 'qs'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
  // 处理参数
  transformRequest: [function(data) {
    data = qs.stringify(data)
    return data
  }]
})
  

// 添加请求拦截器，在请求头中加token
service.interceptors.request.use(
  config => {
    // console.log(config)
    if(config.url == '/diary/allDiary' || config.url ==  '/avatar') {
      console.log('请求拦截器白名单')
      return config
    } else if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  res => {
    // console.log('响应拦截器生效')
    if (res && res.data) {
      let code = res.data.status
      // 10101是未登录状态码
      if (code === '401') { // 如果是未登录直接踢出去
        console.log('401了')
        localStorage.setItem('Authorization', '')
        localStorage.setItem('isLogin', false)
        router.push({name: 'Login'})
      }
    }
    return res
  },
  error => {
    alert('请求失败，请稍后重试！')
    return Promise.reject(error)
  }
)

// export function put(url,data = {}){
//   return new Promise((resolve,reject) => {
//     axios.put(url,data)
//       .then(response => {
//         if(response.data.code === 200){
//           resolve(response.data.data);
//         }else{
//           Toast(response.data.msg)
//         }
//       },err => {
//         reject(err);
//         let message = '请求失败！请检查网络';
//         if(err.response)message=err.response.data.message;
//         Toast(message)
//       })
//   })
// }

  /**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

// export function post(url, data = {}){
//   return new Promise((resolve,reject) => {
//     service.post(url, data)
//       .then(response => {
//         // console.log(response)
//         if(response.data.code === 200){
//           resolve(response.data.data);
//         // }else{
//         //   Toast(response.data.msg)
//         }
//       },err => {
//         console.log(err)
//         reject(err)
//         let message = '请求失败！请检查网络'
//         if(err.response) message=err.response.data.message
//         // Toast(message)
//       })
//   })
// }

export default service

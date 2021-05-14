import axios from './index'

// 登录
export function login(data) {
  return axios({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 注册
export function regist(data) {
  return axios({
    url: '/user/regist',
    method: 'post',
    data
  })
}

// 查询用户资料
export function getUserInfo() {
  return axios({
    url: '/user/info',
    method: 'get',
  })
}

// 修改用户密码
export function updateUserPwd(data) {
  return axios({
    url: '/user/changPwd',
    method: 'put',
    data: data
  })
}

// 修改用户信息
export function updateUserInfo(data) {
  return axios({
    url: '/user/changInfo',
    method: 'put',
    data: data
  })
}

// 上传图片
export function upload(data) {
  return  axios({
    method: 'post',
    url: '/user/upload',
    data: data,
    headers:{
      "content-type": 'multipart/form-data; boundary=<calculated when request is sent>'
    }
  })
}

// 查询日记
export function getDiary(data = {}) {
  return axios({
    url: '/diary/diaryList',
    method: 'get',
    params: data
  })
}

// 查询日记本
export function getDiaryBooks(data = {}) {
  return axios({
    url: '/user/diaryBooks',
    method: 'get',
    params: data
  })
}

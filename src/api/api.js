import axios from './index'

// 登录
export function login(data) {
  return axios({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 退出
//TODO

// 注册
export function regist(data) {
  return axios({
    url: '/user/regist',
    method: 'post',
    data
  })
}

// 查询用户资料
export function getUserInfo(data = {}) {
  return axios({
    url: '/user/info',
    method: 'get',
    params: data

  })
}

// 查询所有用户数
export function getUserCount() {
  return axios({
    url: '/user/allUserCount',
    method: 'get'
  })
}

// 查询所有日记数
export function getAllDiaryCount() {
  return axios({
    url: '/diary/allDiaryCount',
    method: 'get'
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

// 删除服务器图片
export function delPicture(data) {
  return axios({
    url: '/diary/delPicture',
    method: 'put',
    data: data
  })
}

// 根据用户名查询日记
export function getDiary(data = {}) {
  return axios({
    url: '/diary/diaryList',
    method: 'get',
    params: data
  })
}

// 查询所有日记
export function getAllDiary(data = {}) {
  return axios({
    url: '/diary/allDiary',
    method: 'get',
    params: data
  })
}

// 模糊查询
export function searchDiary(data) {
  return axios({
    url: '/diary/search',
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

// 查询日记本中日记数量
export function getDiaryCount(data= {}) {
  return axios({
    url: '/diary/diaryCount',
    method: 'get',
    params: data
  })
}

// 新建日记本
export function addDiaryBook(data) {
  return axios({
    url: '/user/addBook',
    method: 'put',
    data: data
  })
}

// 编辑日记本
export function editBook(data) {
  return axios({
    url: '/user/editBook',
    method: 'put',
    data: data
  })
}

// 删除日记本
export function deleteBook(data) {
  return axios({
    url: '/user/deleteBook',
    method: 'put',
    data: data
  })
}

// 添加日记
export function addDiary(data) {
  return axios({
    url: '/diary/addDiary',
    method: 'post',
    data: data
  })
}

// 修改日记
export function editDiary(data) {
  return axios({
    url: '/diary/editDiary',
    method: 'put',
    data: data
  })
}

// 删除日记
export function deleteDiary(data) {
  return axios({
    url: '/diary/deleteDiary',
    method: 'put',
    data: data
  })
}

// 任务清单
// 添加新任务
export function addTask(data) {
  return axios({
    url: '/user/addTask',
    method: 'put',
    data: data
  })
}

// 获取任务清单
export function getTaskList(data={}) {
  return axios({
    url: '/user/taskList',
    method: 'get',
    data: data
  })
}

// 修改
export function modifyTask(data) {
  return axios({
    url: '/user/modifyTask',
    method: 'put',
    data: data
  })
}

// 完成任务
export function finishTask(data) {
  return axios({
    url: '/user/finishTask',
    method: 'put',
    data: data
  })
}

// 删除任务
export function deleteTask(data) {
  return axios({
    url: '/user/delTask',
    method: 'put',
    data: data
  })
}

// 关注用户
// 关注新用户
export function followUSer(data) {
  return axios({
    url: '/user/addFollowUser',
    method: 'put',
    data: data
  })
}

// 查询关注用户
export function getFollowingUsers(data={}) {
  return axios({
    url: '/user/followingUsers',
    method: 'get',
    data: data
  })
}

// 取消关注
export function cancelFollow(data={}) {
  return axios({
    url: '/user/cancelFollow',
    method: 'delete' , // TODO
    data: data
  })
}
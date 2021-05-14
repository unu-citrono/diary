import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/user/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/regist',
    name: 'Regist',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/regist.vue')
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/userInfo.vue')
  },
  {
    path: '/editDiary',
    name: 'EditDiary',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditDiary.vue')
  },
  {
    path: '/list',
    name: 'DiaryList',
    component: () => import('../views/DiaryList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  console.log('导航守卫')
  if (to.path === '/login' || to.path == '/regist') {
    console.log('在login或regist')
    next()
  } else {
    let token = localStorage.getItem('Authorization')
    console.log(token)
    if (token === 'null' || token === '') {
      console.log('登录失效了')
      next('/login')
    } else {
      next()
    }
  }
})

export default router

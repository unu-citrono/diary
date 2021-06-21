import Vue from 'vue'
import VueRouter from 'vue-router'
import UserHome from '../views/UserHome.vue'
import Home from '../views/Home.vue'
import Login from '../views/user/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/home',
    name: 'UserHome',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserHome.vue')

  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/User.vue')
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
    path: '/editForm',
    name: 'EditForm',
    component: () => import(/* webpackChunkName: "about" */ '../components/EditForm.vue')
  },
  {
    path: '/list',
    name: 'DiaryList',
    component: () => import('../views/DiaryList.vue')
  },
  {
    path: '/follows',
    name: 'FollowList',
    component: () => import('../components/FollowUserList.vue')
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import('../views/mix-chart.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/mix-chart.vue')
  },
  {
    path: '/static',
    name: 'Static',
    component: () => import('../views/UserStatic.vue')
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
  if (to.path === '/login' || to.path == '/regist' || to.path == '/') {
    console.log('在login或regist')
    next()
  } else {
    let token = localStorage.getItem('Authorization')
    console.log(token)
    if (token === 'null' || token === '') {
      console.log('登录失效了')
      localStorage.setItem('isLogin', false)
      alert('登录失效')
      next('/login')
    } else {
      next()
    }
  }
})

export default router

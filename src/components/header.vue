<template>
  <div>
    <el-header>
      <div style="float: left;margin-top: 10px;position:relative;">
        <a href="/" ><img class="logo" src="../assets/logo2.png" /></a>
        <!-- <span class="header-title">Diary</span> -->
      </div>
      <div class="menu-link">
        <el-link type="primary"  :underline="false" href='/'>日记广场</el-link>
        <el-link type="primary" :underline="false" href='/home'>个人中心</el-link>
      </div>


      <div class="right-menu" v-if='isLogin'>
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src = 'avatar' />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-link href='/user' :underline="false">个人中心</el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-link href='/userInfo' :underline="false">个人资料</el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-link :underline="false">统计</el-link>
              </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="right-menu" v-if="!isLogin">
        <el-button type="text" @click="clickLogin">登录</el-button>
        <el-button type="text" @click="clickRegist">注册</el-button>
      </div>
    </el-header>
    <el-divider></el-divider>

  </div>
</template>

<script>
export default {
  // name: Header,
  data() {
    return {
      // showAvatar: this.$route.path != '/login' && this.$route.path != 'regist',
      isLogin: localStorage.getItem('isLogin'),
      show: true,
      avatar: '/api/avatar/' + localStorage.getItem('userId') + '.jpg'
      // avatar: localStorage.getItem('avatar')
    }
  },
  mounted() {
    console.log(localStorage.getItem('isLogin'))
  },
  methods: {
    clickLogin () {
      this.$router.push('/login')
    },
    clickRegist () {
      this.$router.push('/regist')
    },
    logout () {
      localStorage.setItem('Authorization', '')
      localStorage.setItem('isLogin', false)
      localStorage.setItem('userId', '')
      this.isLogin = false
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
.logo {
  width: 190px;
  height: 66px;
  margin-top: -10px;
  margin-left: 15px;
}
.el-divider--horizontal{
  margin: 8px 0!important;
}
.menu-link {
  width: 300px;
  float: left;
  text-align: left;
  margin-left: 20px;
}
.menu-link span{
  font-size: 18px;
  font-weight: bold;
  margin: 28px 0px 0px 25px;
}
.header-title {
  font: 20px large;
  font-weight: bold;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-top: 8px;
    &:focus {
      outline: none;
    }
  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;
    &.hover-effect {
      cursor: pointer;
      transition: background .3s;
      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
  }
  .avatar-container {
    margin-right: 30px;
    .avatar-wrapper {
      margin-top: 5px;
      position: relative;
      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

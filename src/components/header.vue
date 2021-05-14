<template>
  <div>
    <el-header>
      <div style="float: left;margin-top: 10px;">
        <a href="/"><img style="width: 50px; height: 50px" src="../assets/logo.png" /></a>
      </div>
      <div class="title">
       <el-link :underline="false" href="/"><h2>Diary</h2></el-link>
      </div>

      <div class="right-menu" v-show='showRight'>
        <!-- <template v-if="device!=='mobile'"> -->
        <!-- <template>
          <search id="header-search" class="right-menu-item" />

          <error-log class="errLog-container right-menu-item hover-effect" />

          <screenfull id="screenfull" class="right-menu-item hover-effect" />

          <el-tooltip content="Global Size" effect="dark" placement="bottom">
            <size-select id="size-select" class="right-menu-item hover-effect" />
          </el-tooltip>

        </template> -->

        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
            <img class="user-avatar" :src = 'avatar' />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
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
    </el-header>
    <el-divider></el-divider>

  </div>
</template>

<script>
export default {
  // name: Header,
  data() {
    return {
      showRight: this.$route.path != '/login' && this.$route.path != 'regist',
      show: true,
      // imageUrl: '/api/avatar/' + localStorage.getItem('userId') + '.jpg'
      avatar: localStorage.getItem('avatar')
    }
  },
  mounted() {

    console.log(localStorage.getItem('avatar'))
  }
}
</script>

<style lang="less">
.title {
  float: left;
  margin-left: 17px;
  line-height: 50px;
}
.el-divider--horizontal{
  margin: 8px 0!important;
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

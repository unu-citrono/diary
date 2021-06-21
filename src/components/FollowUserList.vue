<template>
  <div id="follow-list">
    <el-scrollbar style="height:100%">
      <ul>
        <li v-for="user in list" :key="user.userId">
          <el-link :underline=false @click="onClick(user.userId)">
            <el-avatar :src='user.avatar' class="avatar"></el-avatar>
            <p class="name">{{user.userName}}</p>
          </el-link>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/api.js'
export default {
  props: ['userList'],
  data() {
    return {
      list: [
        {
          id: '1',
          userName:'user1'
        },
        {
          id: '2',
          userName:'user1'
        },
        {
          id: '3',
          userName:'user1'
        }
      ]
    }
  },
  mounted() {
    let list = []
    console.log(this.userList)
    this.userList.forEach((item, index) => {
      getUserInfo({userId: item}).then(res => {
        let user = {}
        user.userId = item
        user.avatar = '/api/avatar/' + item + '.jpg'
        user.userName = res.data.result.userName
        list.push(user)
      }).catch(err => {
        console.log(err)
      })
      // console.log(list)
      this.list = list
    })
  },
  methods: {
    onClick (id) {
      // console.log(this.list)
      // console.log(id)
      this.$router.push({name: 'User', params: {userId: id}})
    }
  }
}
</script>

<style lang="less">
#follow-list {
  width: 100%px;
  height: 300px;
}
#follow-list *{
  margin: 0;
}
#follow-list ul{
  float: left;
  margin-left: 20px;
  // width: 80%;
  // margin: 0 auto;
}
#follow-list li{
  width: 400px;
  height: 40px;
  list-style: none;
  margin-bottom: 15px;
}
#follow-list li .avatar {
  float: left;
}
#follow-list li .name{
  font-size: 18px;
  font-weight: bold;
  margin-left: 65px;
  padding-top: 10px;
}
#follow-list .el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>

<template>
  <div id="user">
    <div class='basic-info'>
      <div class="avatar">
        <el-avatar shape="square" :size="80" :src='avatar' style="float:left"></el-avatar>
        <div>
          <p>{{user.userName}}</p>
        </div>
        <el-button type="primary" size="mini" style="margin-left:20px" @click="followUser" v-if="!isFollow">关注</el-button>
        <el-button type="primary" size="mini" style="margin-left:20px" @click="followUser" v-if="isFollow" disabled>已关注</el-button>
      </div>
      <div>
        <div class="user-books">
          <p class="titleP">日记本</p>
          <ul>
            <li v-for="book in user.diaryBooks" :key="book._id">
              <el-link :underline=false @click="getDiaryByBook(book.name)">
                <i class="el-icon-tickets"></i>{{book.name}}
              </el-link>
              <!-- <span class="rest-span">剩余10天</span> -->
            </li>
          </ul>
        </div>
          
        <div class="user-books">
          <p class="titleP">任务清单</p>
          <ul>
            <li v-for="task in user.task" :key="task._id">
              <i class="el-icon-date"></i>
              <span>{{task.content}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="diary-show" >
      <h3>全部日记</h3>
      <div class="search-bar">
        <el-input placeholder="请输入关键字" v-model="searchInput">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <diary-list :propList='diaryList' :isOthers=true v-if="showDiary"></diary-list>
    </div>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue'
import DiaryList from '@/components/DiaryList.vue'
import {htmlToText} from '@/untils/untils.js'
import { getUserInfo, getDiary, followUSer, searchDiary } from '@/api/api.js'
export default {
  components: {
    TaskList,
    DiaryList
  },
  data() {
    return {
      isFollow: false,
      userId: '',
      avatar: '',
      user: {},
      diaryList: [],
      showDiary: false,
      searchInput: ''
    }
  },
  mounted() {
    this.userId = this.$route.params.userId
    this.avatar = '/api/avatar/' + this.userId + '.jpg' 
    // 获取当前查看用户d的信息
    getUserInfo({userId: this.userId}).then(res => {
      this.user = res.data.result
    }).catch(err => {
      console.log(err)
    })

    // 获取登录用户的关注列表
    getUserInfo().then(res => {
      let followings = res.data.result.followingUsers
      followings.forEach(item => {
        if(item == this.userId) this.isFollow = true
      })
    }).catch(err => {
      console.log(err)
    })
    // 获取当前用户的开放日记
    getDiary({userId: this.userId,viewLimit: '2'}).then(res => {
      console.log(res)
        var list = res.data.result.diaryList
        this.diaryList = htmlToText(list)
        this.showDiary = false
        this.showDiary = true
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // 关注用户
    followUser() {
      followUSer({userId: this.userId}).then(res => {
        console.log(res)
        this.$message({
          message: '关注成功',
          type: 'success'
        })
        this.isFollow = true
      })
    },
    // 根据日记本获取日记
    getDiaryByBook (name) {
      getDiary({'userId': this.userId,'diaryBook': name}).then( res => {
        var list = res.data.result.diaryList      
        this.diaryList = htmlToText(list)
        this.showDiary = false
        this.showDiary = true
        console.log(this.diaryList)
      }).catch(err => {
        console.log(err)
      })
    },
    search () {
      searchDiary({'keyword': this.searchInput}).then( res => {
        var list =   res.data.result.diaryList    
        this.diaryList = htmlToText(list)
      }).catch(err => {
        console.log(err)
      }) 
    }
  }
}
</script>

<style lang="less">
#user {
  width: 95%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  padding: 10px;
}
#user .avatar {
  text-align: left;
  height: 100px;
  line-height: 45px;
}
#user .avatar p{
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  margin-left: 100px;
}
#user .avatar div span{
  font-size: 14px;
  color: rgba(0,0,0,.45);
  margin-left: 20px;
  margin-top: 5px;
}
#user .basic-info {
  flex: 0 0 30%;
}
#user .diary-show {
  flex: 0 0 70%;
}
#user .search-bar {
  width: 400px;
  // margin: 0 auto;
  margin-bottom: 30px;
}
#user .other-task {
  width: 380px;
  height: 300px;
}
.user-books {
  text-align: left;
  width: 400px;
  // padding: 10px;
}
.user-books .titleP{
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  font-weight: bold;
  border-left: 3px solid #136aa7;
  padding-left: 12px;
  position: relative;
  margin-bottom: 15px;
}
.user-books ul{
  border: 1px solid #dfe0e6;
  border-radius: 4px;
  line-height: 32px;
}
.user-books li{
  list-style: none;
}
.user-books .rest-span{
  float: right;
  margin-right: 10px;
}
</style>

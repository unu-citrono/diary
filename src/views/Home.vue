<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="diary">
      <el-card>
        <div>
          <h2 class="diary-title">我的日记本</h2>
          <el-button round class="edit-button" type="primary" icon="el-icon-edit" @click="editDiary">写日记</el-button>
          <div style="clear:both;"></div>
        </div>
        <div>
          <ul>
            <li v-for="(book) in diaryBooks" :key="book.name">
              <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/images/diary.jpg" class="image">
                <div style="padding: 14px;">
                  <el-link :underline="false" style="text-align: left" @click="getDiaryList(book.name)">{{book.name}}</el-link>
                  <div class="bottom clearfix">
                    <time class="time">{{book.count}}篇日记</time>
                    <el-button type="text" class="button">查看</el-button>
                  </div>
                </div>
              </el-card>
            </li>
          </ul>
        </div>
      </el-card>
    </div>
    <div class="right">
      <calendar :markDate='markDate'></calendar>
      <task-list style="margin-top: 30px"></task-list>
    </div>

    <el-dialog
      title="写日记"
      :visible.sync="writeDiaryVisible"
      width="50%"
      center>
      <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <edit-form @closeEdit='closeEdit' :diaryBooks='diaryBooks'></edit-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="addDairy">确 定</el-button> -->
        <!-- <el-button @click="writeDiaryVisible = false">取 消</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from '@/components/Calendar.vue'
import TaskList from '@/components/TaskList.vue'
import EditForm from '@/components/EditForm.vue'
import axios from 'axios'
import { getDiary, getDiaryBooks } from '@/api/api.js'
import router from '@/router'

export default {
  name: 'Home',
  components: {
    Calendar,
    TaskList,
    EditForm
  },
  data() {
    return {
      currentDate: new Date(),
      writeDiaryVisible: false,
      diaryBooks: [],
      diaryList: [],
      markDate: []
    }
  },
  mounted() {
    let that = this
    // 获取当前用户的日记本
    getDiaryBooks().then(function(res) {
      console.log(res)
      that.diaryBooks = res.data.result.diaryBooks
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  
  methods: {
    editDiary() {
      // this.writeDiaryVisible = true
      this.$router.push('/editDiary')
    },
    closeEdit (status) {
      this.writeDiaryVisible = status
    },
    getDiaryList (name) {
      let that = this
      getDiary({diaryBook: name}).then(function(res) {
        console.log(res)
        router.push({name: 'DiaryList', params: {list: res.data.result.diaryList}})
      })
    }
  }
}
</script>

<style lang="less">
.home {
  width: 100%;
}
.diary {
  display: inline-block;
  width: 1000px;
  margin-left: -570px;
  margin-top: 30x;
}
.right {
  display: inline-block;
  position: absolute;
  margin-left: 70px;
  width: 350px;
}
.diary li {
  list-style: none;
  width: 160px;
  // display: inline-block;
  margin-right: 24px;
  margin-bottom: 30px;
  float: left;
}
.diary ul {
  width: 1000px;
}

.diary-title {
  float: left;
}
.edit-button {
  float: left;
  margin: 18px 25px!important;
}
.time {
  font-size: 13px;
  color: #999;
  float: left;
  margin-left: 10px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  // padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>

<template>
  <div>
    <!-- <my-header></my-header> -->
    <div id="user-home">
      <el-card id="diary">
        <div id="my-diary">
          <div>
            <h2 class="diary-title">我的日记本</h2>
            <el-button round class="edit-button" type="primary" icon="el-icon-edit" @click="editDiary">写日记</el-button>
            <el-button round class="edit-button" icon="el-icon-tickets"  @click="showBookOptions = true">管理日记本</el-button>
            <div style="clear:both;"></div>
          </div>
          <div id="diary-books" v-if="showBooks">
              <li v-for="(book) in diaryBooks" :key="book.name" >
                <el-card :body-style="{ padding: '0px' }">
                  <img src="../assets/images/diary2.jpg" class="image">
                  <div style="padding: 14px;">
                    <el-link :underline="false" style="text-align: left" @click="getDiaryListByBook(book.name)">{{book.name}}</el-link>
                    <div class="bottom clearfix">
                      <span class="time">{{book.count}}篇日记</span>
                      <!-- <el-button type="text" class="button">查看</el-button> -->
                    </div>
                  </div>
                </el-card>
              </li>
          </div>
        </div>
     
        <div>
          <h2 class="diary-title">最新日记</h2>
          <div style="clear:both;"></div>
        </div>
        <diary-list :propList='latestDiary' v-if="showLatest"></diary-list>
      </el-card>
    <div class="right">
      <div class="show-count">
        <div>
          <p>关注用户数</p>
          <span class="count">{{followIdList.length}}</span>
          <el-button size="mini" style="margin-left:20px" @click="showFollows = true">查看</el-button>
        </div>
        <div>
          <p>日记总数</p>
          <span class="count">{{diaryCount}}</span>
          <el-button size="mini" style="margin-left:20px;">查看</el-button>
        </div>
      </div>
      <calendar :markDate='markDate'></calendar>
      <task-list style="margin-top: 30px"></task-list>
    </div>
    <!-- 关注用户弹窗 -->
    <el-dialog
      title="关注用户"
      :visible.sync="showFollows"
      width="30%"
      center>
        <follow-user-list :userList='followIdList'></follow-user-list>
    </el-dialog>
    <el-dialog
      title="日记本管理"
      :visible.sync="showBookOptions"
      width="40%"
      center
      >
      <div>
        <el-input class="add-book-input" v-model="newBookName" placeholder="请输入新建日记本名称"></el-input>
        <el-button size="medium" type="primary" icon="el-icon-circle-plus" plain @click="addDiaryBook">新建</el-button>
        <el-table :data="diaryBooks" style="width: 100%;margin-top: 15px">
          <el-table-column prop="name" label="名称" width="180">
          </el-table-column>
          <el-table-column prop="count" label="日记数量" width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popover placement="top" width="280" :ref="scope.$index">
                <div class="edit-popover">
                    <h3>重命名日记本</h3>
                    <el-input v-model="bookRename" placeholder="请输入新名称"></el-input>
                    <el-button size="mini" type="text" @click="scope._self.$refs[scope.$index].doClose()">取消</el-button>
                    <el-button type="primary" size="mini" @click="scope._self.$refs[scope.$index].doClose();handleEdit(scope.$index, scope.row)">确定</el-button>
                </div>
                <el-button type="text" size="small" slot="reference">编辑</el-button>
            </el-popover>
              <el-popconfirm title="确定删除吗？" @confirm='handleDelete(scope.$index, scope.row)'>
                <el-button slot="reference" type="danger" size="mini"  style="margin-left:10px">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="showBookOptions = false">取 消</el-button> -->
        <el-button type="primary" @click="showBookOptions = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </div>

</template>

<script>
import Calendar from '@/components/Calendar.vue'
import TaskList from '@/components/TaskList.vue'
import DiaryList from '@/components/DiaryList.vue'
import MyHeader from '@/components/header.vue'
import FollowUserList from '@/components/FollowUserList.vue'
import { getUserInfo, getDiary, getDiaryBooks, getDiaryCount,addDiaryBook, editBook, deleteBook } from '@/api/api.js'
import router from '@/router'
export default {
  name: 'Home',
  components: {
    MyHeader,
    Calendar,
    TaskList,
    DiaryList,
    FollowUserList
  },
  data() {
    return {
      showRename: false,
      showBooks: false,
      showBookOptions: false,
      showFollows: false,
      showLatest: false,
      user: {},
      followCount: 0,
      followIdList: [],
      diaryCount: 0,
      latestDiary: [],
      currentDate: new Date(),
      writeDiaryVisible: false,
      diaryBooks: [],
      diaryList: [],
      markDate: [],
      newBookName: '',  // 新建日记本输入框
      bookRename: '', // 重命名输入框
    }
  },
  mounted() {
    this.getDiaryBooks()
    getUserInfo().then(res => {
      this.user = res.data.result
      this.followIdList = this.user.followingUsers 
      // this.followCount = this.user.followingUsers.length
    }).catch(err => {
      console.log(err)
    })
    // 获取最新日记
    getDiary().then(res => {
        var list =  res.data.result.diaryList
        this.diaryCount = list.length  
        var re = new RegExp('<[^<>]+>','g')
        list.forEach((item, index) => {
          var text = item.content.replace(re, "")
          list[index].text = text
        })
        this.latestDiary = list
        this.showLatest = true
      })
  },
  
  methods: {
    // 获取当前用户的日记本
    getDiaryBooks() {
    let that = this
      getDiaryBooks().then(res => {
        let books = res.data.result.diaryBooks;
          for(let index in books){
            let param = {
              diaryBook: books[index].name
            }
            getDiaryCount(param).then(res => {
              books[index].count = res.data.result
              that.diaryBooks = books
              that.showBooks = false
              that.showBooks = true
              // location.reload()
            })
          }
      })
      .catch(function (error) {
        console.log(error)
      })
    },

    // 跳转到写日记页面
    editDiary() {
      this.$router.push('/editForm')
    },
    closeEdit (status) {
      this.writeDiaryVisible = status
    },

    // 获取用户的所有日记  用于展示最新日记
    getDiaryListById () {
      getDiary().then(res => {
        var list =   res.data.result.diaryList      
        var re = new RegExp('<[^<>]+>','g')
        list.forEach((item, index) => {
          var text = item.content.replace(re ,"")
          list[index].text = text
        })
        this.latestDiary = list
      })
    },

    // 获取当前日记本的所有日记
    getDiaryListByBook (name) {
      let that = this
      getDiary({'diaryBook': name}).then(function(res) {
        var list =   res.data.result.diaryList      
        var re = new RegExp('<[^<>]+>','g')
        list.forEach((item, index) => {
          var text = item.content.replace(re ,"")
          list[index].text = text
        })
        router.push({name: 'DiaryList', params: {list: list, bookName: name}})
      })
    },

    // 新建日记本 
    addDiaryBook() {
      let param = {
        name: this.newBookName
      }
      addDiaryBook(param).then(res => {
        if(res.data.status == '200') {
          this.$message({
            message: '添加日记本成功',
            type: 'success'
          })
          this.diaryBooks.push({name: this.newBookName, count: 0})
          this.newBookName = ''
        }
      }).catch(err => {
      })
    },

    // 编辑日记本
    handleEdit(index, row) {
      this.showRename = false
      let param = {
        oldName: row.name,
        newName: this.bookRename
      }
      editBook(param).then(res => {
        if(res.data.status == '200'){
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.diaryBooks[index].name = this.bookRename
        }
      })
    },
    handleDelete(index, row) {
      let param = {
        name: row.name
      }
      deleteBook(param).then(res => {
        if(res.data.status == '200'){
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.diaryBooks.splice(index, 1)
        }
      })
    }
  }
}
</script>

<style lang="less">
#user-home {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
#diary {
  flex: 0 0 1000px;
  display: flex;
  flex-direction: column;
}
#diary .diary-title {
  // float: left;
  text-align: left;
  width: 100%;
}

// 我的日记本
#my-diary {
  flex: 0 0 auto;
}

#diary-books {  // 日记本列表
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;

}
#my-diary li{
  list-style: none;
  width: 160px;
  // display: inline-block;
  margin-right: 24px;
  margin-bottom: 30px;
  float: left;
}
#user-home .show-count {
  width: 250px;
  font-weight: bold;
  margin-bottom: 30px;
}
#user-home .show-count>div {
  margin-top: 15px;
}
#user-home .show-count>div p{
  // text-align: left;
  float: left;
  margin: 0;
}
#user-home .show-count>div .count{
  font-size: 20px;
  color: #409EFF;
  font-weight: bold;
  vertical-align: top;
  margin-left: -35px;
}
// 最新日记
#diary div:nth-child(2){
  flex: 0 0 auto;
}
.right {
  flex: 0 0 350px;
}
.add-book-input {
  width: 350px!important;
}
.add-book-input~.el-button{
  margin-left: 20px;
}
.edit-button {
  float: left;
  // margin: 18px 25px!important;
}
.edit-popover {
  width: 200px;
  height: 140px;
  margin: 0 auto;
  text-align: center;
}
.edit-popover button{
  margin-top: 10px;
}
.time {
  font-size: 13px;
  color: #999;
  // float: left;
  // margin-left: 10px;
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

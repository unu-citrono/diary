<template>
  <div id="home" v-loading="loading">
    <el-card id="home-diary-card">
      <p class="titleP">今天是{{today}}</p>
      <p class="titleP">共有{{userCount}}人写下{{diaryCount}}篇日记</p>
      <diary-item v-for="diary in currentList" :key="diary._id" :diaryItem='diary'></diary-item>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="diaryList.length"
          :current-page="currentPage"
          :page-size='pageSize'
          hide-on-single-page
          @current-change='pageChange'>
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import DiaryItem from '@/components/DiaryItem.vue'
import { getAllDiary,getAllDiaryCount, getUserCount } from '@/api/api.js'
import {dateFormat} from '@/untils/untils.js'

export default {
  components: {
    DiaryItem
  },
  data() {
    return {
      loading: true,
      diaryList: [],
      currentList: [],
      today: dateFormat('YYYY年mm月dd日', new Date()),
      diaryCount: '',
      userCount: '',
      currentPage: 1,
      pageSize: 10,
    }
  },
  mounted() {
    // console.log(this.DiaryItem)
    getAllDiary({viewLimit: '2'}).then(res => {
      // console.log(res)
      var list =   res.data.result.diaryList   
        var re = new RegExp('<[^<>]+>','g')
        list.forEach((item, index) => {
          var text = item.content.replace(re ,"")
          list[index].text = text
        })
      this.diaryList =list
      this.currentList = this.diaryList.slice(0, 10)
      this.loading = false
    }) 
    getAllDiaryCount().then(res => {
      this.diaryCount = res.data.result
    })
    getUserCount().then(res => {
      this.userCount = res.data.result
    }) 
    
  },
  methods: {
    pageChange (page) {
      let start = this.pageSize * (page - 1)
      let end = start + 10
      this.currentList = this.diaryList.slice(start, end)
    }
  }
}
</script>

<style lang="less">
#home {
  width: 100%;
}
#home-diary-card {
  width: 1100px;
  margin: 0 auto;

}
#home-diary-card .titleP {
  font-size: 18px;
  font-weight: bold;
}
</style>
